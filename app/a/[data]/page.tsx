'use client';
import { useState, useEffect, Suspense } from 'react';
import toast from 'react-hot-toast';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSendTransaction } from 'wagmi';
import { Interface } from 'ethers';
import { parseEther } from 'viem';
import Header from '@/app/components/Header';
import { useRef } from 'react';
import { ExternalLink, CheckCircle, Loader2, Zap, Image, AlertCircle } from 'lucide-react';

interface ActionMetadata {
  title: string;
  icon: string;
  description: string;
  label: string;
}

interface ActionData {
  id: string;
  action_type: 'tip' | 'nft_sale';
  short_id: string;
  recipient_address?: string;
  tip_amount_eth?: string;
  contract_address?: string;
  token_id?: string;
  price?: string;
  description?: string;
}

function ActionComponent({ params }: { params: { data: string } }) {
  const { data: urlData } = params;
  const [metadata, setMetadata] = useState<ActionMetadata | null>(null);
  const [actionData, setActionData] = useState<ActionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<string>('Loading...');
  const [txnHash, setTxnHash] = useState<`0x${string}` | undefined>(undefined);
  const loadingToastId = useRef<string | undefined>(undefined);

  const { isConnected } = useAccount();
  const { data: hashWrite, writeContract, error: writeError } = useWriteContract();
  const { data: hashSend, sendTransaction } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txnHash });

  useEffect(() => {
    if (!urlData) {
      setIsLoading(false);
      setStatus('Error: Invalid action link.');
      return;
    }

    const fetchActionData = async () => {
      try {
        // Parse the URL data: "action_type-short_id"
        const [actionType, shortId] = urlData.split('-', 2);
        
        if (!actionType || !shortId) {
          throw new Error('Invalid URL format');
        }

        // Fetch action data from the API
        const response = await fetch(`/api/execute/${shortId}`);
        if (!response.ok) {
          throw new Error('Action not found');
        }

        const actionData: ActionData = await response.json();
        setActionData(actionData);

        // Create metadata based on action type
        let meta: ActionMetadata;
        if (actionData.action_type === 'tip') {
          meta = {
            title: 'Send a Tip',
            icon: 'Zap',
            description: actionData.description || `You are about to send a ${actionData.tip_amount_eth} CORE tip.`,
            label: 'Send Tip',
          };
        } else if (actionData.action_type === 'nft_sale') {
          meta = {
            title: 'Buy an NFT',
            icon: 'Image',
            description: actionData.description || `You are about to buy NFT #${actionData.token_id} for ${actionData.price} CORE.`,
            label: 'Buy NFT',
          };
        } else {
          throw new Error('Unsupported action type');
        }
        
        setMetadata(meta);
        setStatus('Ready to proceed.');
      } catch (error: any) {
        toast.error('Invalid or corrupt action link.');
        setStatus('Error: Invalid Link');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActionData();
  }, [urlData]);
  
  useEffect(() => {
    if (hashWrite) setTxnHash(hashWrite);
  }, [hashWrite]);
  useEffect(() => {
    if (hashSend) setTxnHash(hashSend);
  }, [hashSend]);
  useEffect(() => {
    if (isConfirming) setStatus('Confirming transaction...');
    if (isConfirmed) {
      setStatus('Success! Action complete.');
      if (loadingToastId.current) toast.dismiss(loadingToastId.current);
      toast.success('Transaction Confirmed!');
    }
    if (writeError) {
      const message = writeError.message.split('\n')[0];
      setStatus(`Error: ${message}`);
      if (loadingToastId.current) toast.dismiss(loadingToastId.current);
      toast.error(message);
    }
  }, [isConfirming, isConfirmed, writeError]);

  const handleAction = () => {
    if (!actionData || !isConnected) return;
    try {
      if (actionData.action_type === 'tip') {
        loadingToastId.current = toast.loading('Confirming transaction...');
        sendTransaction({
          to: actionData.recipient_address as `0x${string}`,
          value: parseEther(actionData.tip_amount_eth!),
        });
      } else if (actionData.action_type === 'nft_sale') {
        const nftSaleAbi = [
          {
            "type": "function",
            "name": "buy",
            "stateMutability": "payable",
            "inputs": [{ "name": "tokenId", "type": "uint256" }],
            "outputs": []
          }
        ] as const;
        writeContract({
          abi: nftSaleAbi,
          address: actionData.contract_address as `0x${string}`,
          functionName: 'buy',
          args: [BigInt(actionData.token_id!)],
          value: parseEther(actionData.price!),
        });
      }
    } catch (error: any) {
      if (loadingToastId.current) toast.dismiss(loadingToastId.current);
      toast.error(error.message);
      setStatus(`Error: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl top-20 left-20" />
          <div className="absolute w-80 h-80 bg-gradient-to-r from-orange-600/15 to-red-500/15 rounded-full blur-2xl bottom-20 right-20" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="bg-black/30 backdrop-blur-2xl border border-orange-400/30 rounded-3xl p-12 shadow-2xl">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-12 h-12 text-orange-400 animate-spin" />
              <p className="text-orange-100 text-lg font-medium">Loading Action...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!metadata) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl top-20 left-20" />
          <div className="absolute w-80 h-80 bg-gradient-to-r from-orange-600/15 to-red-600/15 rounded-full blur-2xl bottom-20 right-20" />
        </div>
        
        <div className="relative z-10 bg-black/30 backdrop-blur-2xl border border-red-400/30 rounded-3xl p-8 text-center max-w-md mx-4 shadow-2xl">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-red-400 text-xl font-semibold mb-2">Invalid Action Link</h2>
          <p className="text-orange-100/70">Could not load this action. The link appears to be corrupted or invalid.</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    if (isConfirmed) return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (isConfirming) return <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />;
    if (status.includes('Error')) return <AlertCircle className="w-5 h-5 text-red-400" />;
    return actionData?.action_type === 'tip' ? <Zap className="w-5 h-5 text-orange-400" /> : <Image className="w-5 h-5 text-orange-400" />;
  };

  const getStatusColor = () => {
    if (isConfirmed) return 'text-green-400';
    if (isConfirming) return 'text-orange-400';
    if (status.includes('Error')) return 'text-red-400';
    return 'text-orange-200';
  };

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-orange-500/15 to-amber-500/15 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-orange-600/10 to-red-500/10 rounded-full blur-2xl bottom-20 right-20" />
        <div className="absolute w-64 h-64 bg-gradient-to-r from-amber-500/10 to-orange-400/10 rounded-full blur-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Improved Header with Blur */}
      <div className="relative z-20 bg-black/20 backdrop-blur-2xl border-b border-orange-400/20 shadow-2xl">
        <Header />
      </div>

      <main className="flex flex-1 items-center justify-center w-full min-h-screen p-4 relative z-10">
        <div className="w-full max-w-lg">
          {/* Main Action Card */}
          <div className="bg-black/25 backdrop-blur-2xl border border-orange-400/25 shadow-2xl rounded-3xl p-8 mb-6 relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 rounded-3xl" />
            
            <div className="relative z-10">
              {/* Connect Button Section */}
              <div className="flex items-center justify-center mb-8">
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-orange-400/30 shadow-xl">
                  <ConnectButton showBalance={false} accountStatus="address" />
                </div>
              </div>

              {/* Action Content */}
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Enhanced Icon with Glassmorphism */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-black/30 backdrop-blur-xl border border-orange-400/30 rounded-3xl p-4 shadow-2xl">
                    <div className="w-24 h-24 rounded-2xl shadow-xl bg-black/50 flex items-center justify-center">
                      {metadata.icon === 'Zap' ? (
                        <Zap className="w-16 h-16 text-orange-400" />
                      ) : metadata.icon === 'Image' ? (
                        <Image className="w-16 h-16 text-orange-400" />
                      ) : (
                        <Zap className="w-16 h-16 text-orange-400" />
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-orange-500/90 to-amber-500/90 backdrop-blur-xl border border-orange-400/40 rounded-full p-3 shadow-2xl">
                    {actionData?.action_type === 'tip' ? (
                      <Zap className="w-5 h-5 text-white" />
                    ) : (
                      <Image className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                  {metadata.title}
                </h1>

                {/* Enhanced Description Card */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-orange-400/25 max-w-md shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 rounded-2xl" />
                  <p className="relative text-orange-100 text-lg leading-relaxed whitespace-pre-wrap break-words">
                    {metadata.description}
                  </p>
                </div>

                {/* Enhanced Action Button */}
                {isConnected && (
                  <button
                    onClick={handleAction}
                    disabled={isConfirming || isConfirmed}
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/30 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden backdrop-blur-xl border ${
                      isConfirming 
                        ? 'bg-black/50 border-orange-400/20 cursor-not-allowed text-orange-200/50' 
                        : isConfirmed 
                          ? 'bg-gradient-to-r from-green-500/80 to-emerald-500/80 border-green-400/40 text-white shadow-green-500/25' 
                          : 'bg-gradient-to-r from-orange-500/80 to-amber-500/80 border-orange-400/40 hover:from-orange-500/90 hover:to-amber-500/90 hover:border-orange-300/50 text-white shadow-orange-500/25'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    {isConfirming ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Confirming...
                      </>
                    ) : isConfirmed ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Action Complete!
                      </>
                    ) : (
                      <>
                        {actionData?.action_type === 'tip' ? <Zap className="w-5 h-5" /> : <Image className="w-5 h-5" />}
                        {metadata.label} Now
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Status Card */}
          <div className="bg-black/20 backdrop-blur-2xl border border-orange-400/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-amber-500/5 rounded-2xl" />
            <div className="relative flex items-center justify-center gap-3">
              {getStatusIcon()}
              <p className={`text-base font-medium ${getStatusColor()}`}>
                {status}
              </p>
            </div>
          </div>

          {/* Enhanced Transaction Link */}
          {isConfirmed && txnHash && (
            <div className="mt-6 bg-black/20 backdrop-blur-2xl border border-orange-400/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 rounded-2xl" />
              <div className="relative text-center">
                <p className="text-orange-200 mb-3 font-medium">Transaction Confirmed</p>
                <a
                  href={`https://scan.test2.btcs.network/tx/${txnHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-300 hover:text-orange-200 transition-colors duration-200 font-medium break-all bg-black/40 backdrop-blur-xl px-4 py-2 rounded-xl border border-orange-400/30 hover:border-orange-300/40 shadow-lg hover:shadow-orange-500/10"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">View on Explorer</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function Page({ params }: { params: { data: string } }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl top-20 left-20" />
          <div className="absolute w-80 h-80 bg-gradient-to-r from-orange-600/15 to-red-500/15 rounded-full blur-2xl bottom-20 right-20" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="bg-black/30 backdrop-blur-2xl border border-orange-400/30 rounded-3xl p-12 shadow-2xl">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-12 h-12 text-orange-400 animate-spin" />
              <p className="text-orange-100 text-lg font-medium">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <ActionComponent params={params} />
    </Suspense>
  );
}