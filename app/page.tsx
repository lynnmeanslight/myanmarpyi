"use client";

import { useState, useEffect } from "react";
import {
  useConnect,
  useConnection,
  useDisconnect,
  useReadContract,
  useSendCalls,
  useWriteContract,
  useWatchContractEvent,
} from "wagmi";
import { SignInWithBase } from "./components/SignInWithBase";
import { MyanmarMap } from "./components/MyanmarMap";
import { REGIONS } from "./data/regions";
import {
  MYANMARPYI_ADDRESS,
  MyanmarPyiABI,
  regionNumberFromId,
  type RegionNote,
} from "./lib/regionNotes";
import { encodeFunctionData } from "viem";
import { baseSepolia } from "viem/chains";
import { useLanguage } from "./i18n/LanguageContext";
import { createPublicClient, http } from "viem";

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http("https://sepolia.base.org"), // public RPC
});

// Emoji enum matching the contract
const EMOJI = {
  LIKE: 0, // 👍
  LOVE: 1, // ❤️
  LAUGH: 2, // 😂
  SAD: 3, // 😢
  FIRE: 4, // 🔥
  SUPPORT: 5, // 🙏
};

const EMOJI_ICONS: { [key: number]: string } = {
  [EMOJI.LIKE]: "👍",
  [EMOJI.LOVE]: "❤️",
  [EMOJI.LAUGH]: "😂",
  [EMOJI.SAD]: "😢",
  [EMOJI.FIRE]: "🔥",
  [EMOJI.SUPPORT]: "🙏",
};

// Helper functions to get colors based on region
const getRegionBorderColor = (colorClass: string) => {
  if (colorClass.includes("sky")) return "border-sky-200";
  if (colorClass.includes("emerald")) return "border-emerald-200";
  if (colorClass.includes("violet")) return "border-violet-200";
  if (colorClass.includes("rose")) return "border-rose-200";
  if (colorClass.includes("amber")) return "border-amber-200";
  if (colorClass.includes("blue")) return "border-blue-200";
  if (colorClass.includes("indigo")) return "border-indigo-200";
  if (colorClass.includes("purple")) return "border-purple-200";
  if (colorClass.includes("pink")) return "border-pink-200";
  if (colorClass.includes("teal")) return "border-teal-200";
  if (colorClass.includes("cyan")) return "border-cyan-200";
  if (colorClass.includes("lime")) return "border-lime-200";
  if (colorClass.includes("green")) return "border-green-200";
  if (colorClass.includes("yellow")) return "border-yellow-200";
  if (colorClass.includes("orange")) return "border-orange-200";
  if (colorClass.includes("red")) return "border-red-200";
  return "border-rose-200";
};

const getRegionBgColor = (colorClass: string) => {
  if (colorClass.includes("sky")) return "bg-sky-500";
  if (colorClass.includes("emerald")) return "bg-emerald-500";
  if (colorClass.includes("violet")) return "bg-violet-500";
  if (colorClass.includes("rose")) return "bg-rose-500";
  if (colorClass.includes("amber")) return "bg-amber-500";
  if (colorClass.includes("blue")) return "bg-blue-500";
  if (colorClass.includes("indigo")) return "bg-indigo-500";
  if (colorClass.includes("purple")) return "bg-purple-500";
  if (colorClass.includes("pink")) return "bg-pink-500";
  if (colorClass.includes("teal")) return "bg-teal-500";
  if (colorClass.includes("cyan")) return "bg-cyan-500";
  if (colorClass.includes("lime")) return "bg-lime-500";
  if (colorClass.includes("green")) return "bg-green-500";
  if (colorClass.includes("yellow")) return "bg-yellow-500";
  if (colorClass.includes("orange")) return "bg-orange-500";
  if (colorClass.includes("red")) return "bg-red-500";
  return "bg-rose-500";
};

const getRegionHoverBgColor = (colorClass: string) => {
  if (colorClass.includes("sky")) return "hover:bg-sky-600";
  if (colorClass.includes("emerald")) return "hover:bg-emerald-600";
  if (colorClass.includes("violet")) return "hover:bg-violet-600";
  if (colorClass.includes("rose")) return "hover:bg-rose-600";
  if (colorClass.includes("amber")) return "hover:bg-amber-600";
  if (colorClass.includes("blue")) return "hover:bg-blue-600";
  if (colorClass.includes("indigo")) return "hover:bg-indigo-600";
  if (colorClass.includes("purple")) return "hover:bg-purple-600";
  if (colorClass.includes("pink")) return "hover:bg-pink-600";
  if (colorClass.includes("teal")) return "hover:bg-teal-600";
  if (colorClass.includes("cyan")) return "hover:bg-cyan-600";
  if (colorClass.includes("lime")) return "hover:bg-lime-600";
  if (colorClass.includes("green")) return "hover:bg-green-600";
  if (colorClass.includes("yellow")) return "hover:bg-yellow-600";
  if (colorClass.includes("orange")) return "hover:bg-orange-600";
  if (colorClass.includes("red")) return "hover:bg-red-600";
  return "hover:bg-rose-600";
};

const getRegionTextColor = (colorClass: string) => {
  if (colorClass.includes("sky")) return "text-sky-500";
  if (colorClass.includes("emerald")) return "text-emerald-500";
  if (colorClass.includes("violet")) return "text-violet-500";
  if (colorClass.includes("rose")) return "text-rose-500";
  if (colorClass.includes("amber")) return "text-amber-500";
  if (colorClass.includes("blue")) return "text-blue-500";
  if (colorClass.includes("indigo")) return "text-indigo-500";
  if (colorClass.includes("purple")) return "text-purple-500";
  if (colorClass.includes("pink")) return "text-pink-500";
  if (colorClass.includes("teal")) return "text-teal-500";
  if (colorClass.includes("cyan")) return "text-cyan-500";
  if (colorClass.includes("lime")) return "text-lime-500";
  if (colorClass.includes("green")) return "text-green-500";
  if (colorClass.includes("yellow")) return "text-yellow-500";
  if (colorClass.includes("orange")) return "text-orange-500";
  if (colorClass.includes("red")) return "text-red-500";
  return "text-rose-500";
};

function App() {
  const { t, language, setLanguage } = useLanguage();
  const account = useConnection();
  const { sendCalls, data, isPending, isSuccess, error } = useSendCalls();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const [showContent, setShowContent] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState<string>(
    REGIONS[0]?.id ?? "MM01"
  );
  const [messageText, setMessageText] = useState<string>("");
  const [messageCounts, setMessageCounts] = useState<Record<string, number>>(
    {}
  );
  const [reactionCounts, setReactionCounts] = useState<
    Record<number, Record<number, number>>
  >({});
  const [totalStats, setTotalStats] = useState({
    users: 0,
    messages: 0,
    emojis: 0,
  });

  const regionNumber = regionNumberFromId(selectedRegionId);
  const isConnected = account.status === "connected";
  const contractReady = Boolean(MYANMARPYI_ADDRESS);

  // First, get the total message count for the region
  const { data: messageCountData } = useReadContract({
    address: MYANMARPYI_ADDRESS,
    abi: MyanmarPyiABI,
    functionName: "messageCount",
    args: [regionNumber],
    query: {
      enabled: isConnected && contractReady && regionNumber > 0,
    },
  });

  const totalMessages = messageCountData ? Number(messageCountData) : 20;

  // Then fetch all messages using the count
  const {
    data: messagesData,
    isPending: messagesLoading,
    refetch: refetchMessages,
  } = useReadContract({
    address: MYANMARPYI_ADDRESS,
    abi: MyanmarPyiABI,
    functionName: "getMessages",
    args: [regionNumber, BigInt(0), BigInt(totalMessages)],
    query: {
      enabled:
        isConnected && contractReady && regionNumber > 0 && totalMessages > 0,
    },
  });

  const writeContract = useWriteContract();
  const isPosting = writeContract.isPending;

  // Define fetch functions before they're used in event handlers
  const fetchEmojiCounts = async () => {
    if (!messagesData || !contractReady) return;

    const messages = messagesData as RegionNote[];
    const counts: Record<number, Record<number, number>> = {};

    for (let msgIndex = 0; msgIndex < messages.length; msgIndex++) {
      counts[msgIndex] = {};

      for (let emoji = 0; emoji <= 5; emoji++) {
        const value = await publicClient.readContract({
          address: MYANMARPYI_ADDRESS,
          abi: MyanmarPyiABI,
          functionName: "emojiCount",
          args: [regionNumber, BigInt(msgIndex), emoji],
        });

        counts[msgIndex][emoji] = Number(value);
      }
    }

    setReactionCounts(counts);
  };

  const fetchTotalStats = async () => {
    if (!contractReady) return;

    let totalMessages = 0;
    let totalEmojis = 0;
    const uniqueAuthors = new Set<string>();

    // Loop through all 15 regions
    for (let region = 1; region <= 15; region++) {
      try {
        // Get message count for this region
        const msgCount = await publicClient.readContract({
          address: MYANMARPYI_ADDRESS,
          abi: MyanmarPyiABI,
          functionName: "messageCount",
          args: [region],
        });

        const count = Number(msgCount);
        totalMessages += count;

        if (count > 0) {
          // Fetch messages to get unique authors
          const messages = await publicClient.readContract({
            address: MYANMARPYI_ADDRESS,
            abi: MyanmarPyiABI,
            functionName: "getMessages",
            args: [region, BigInt(0), BigInt(count)],
          });

          // Count unique authors
          (messages as RegionNote[]).forEach((msg) => {
            uniqueAuthors.add(msg.author.toLowerCase());
          });

          // Count all emoji reactions for this region
          for (let msgIndex = 0; msgIndex < count; msgIndex++) {
            for (let emoji = 0; emoji <= 5; emoji++) {
              const emojiCount = await publicClient.readContract({
                address: MYANMARPYI_ADDRESS,
                abi: MyanmarPyiABI,
                functionName: "emojiCount",
                args: [region, BigInt(msgIndex), emoji],
              });
              totalEmojis += Number(emojiCount);
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching stats for region ${region}:`, error);
      }
    }

    setTotalStats({
      users: uniqueAuthors.size,
      messages: totalMessages,
      emojis: totalEmojis,
    });
  };

  const fetchAllRegionMessageCounts = async () => {
    if (!contractReady) return;

    const counts: Record<string, number> = {};

    // Fetch message counts for all regions to display on map
    for (let i = 0; i < REGIONS.length; i++) {
      const region = REGIONS[i];
      const regionNum = regionNumberFromId(region.id);

      try {
        const msgCount = await publicClient.readContract({
          address: MYANMARPYI_ADDRESS,
          abi: MyanmarPyiABI,
          functionName: "messageCount",
          args: [regionNum],
        });

        counts[region.id] = Number(msgCount);
      } catch (error) {
        console.error(`Error fetching count for region ${region.id}:`, error);
        counts[region.id] = 0;
      }
    }

    setMessageCounts(counts);
  };

  // Watch for MessagePosted events to update messages in real-time
  useWatchContractEvent({
    address: MYANMARPYI_ADDRESS,
    abi: MyanmarPyiABI,
    eventName: "MessagePosted",
    onLogs(logs) {
      console.log("MessagePosted event detected:", logs);
      // Refetch messages when a new message is posted
      refetchMessages();
      // Refetch all region counts for map badges
      fetchAllRegionMessageCounts();
      // Also refetch total stats since message count changed
      fetchTotalStats();
    },
    enabled: isConnected && contractReady,
  });

  // Watch for EmojiReacted events to update reactions in real-time
  useWatchContractEvent({
    address: MYANMARPYI_ADDRESS,
    abi: MyanmarPyiABI,
    eventName: "EmojiReacted",
    onLogs(logs) {
      console.log("EmojiReacted event detected:", logs);
      // Refetch emoji counts when a reaction is added
      fetchEmojiCounts();
      // Also refetch total stats since emoji count changed
      fetchTotalStats();
    },
    enabled: isConnected && contractReady,
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch emoji counts for all messages when data changes
  useEffect(() => {
    fetchEmojiCounts();
  }, [messagesData, regionNumber, contractReady]);

  // Fetch total statistics across all regions on mount and when contract is ready
  useEffect(() => {
    fetchTotalStats();
  }, [contractReady]);

  // Fetch all region message counts for map badges on mount and when connected
  useEffect(() => {
    if (isConnected && contractReady) {
      fetchAllRegionMessageCounts();
    }
  }, [isConnected, contractReady]);

  const handlePost = async () => {
    if (!isConnected || !contractReady || !regionNumber) return;
    if (!messageText.trim()) return;

    const userAddress = account.address || "";

    // Optimistic update - immediately add message to UI
    const optimisticMessage: RegionNote = {
      author: userAddress,
      text: messageText.trim(),
      timestamp: BigInt(Math.floor(Date.now() / 1000)),
      hidden: false,
    };

    // Store current messages and add optimistic message
    const currentMessages = (messagesData as RegionNote[]) || [];
    const optimisticMessages = [...currentMessages, optimisticMessage];

    // const calls = [
    //   {
    //     to: MYANMARPYI_ADDRESS,
    //     value: "0x0",
    //     data: encodeFunctionData({
    //       abi: MyanmarPyiABI,
    //       functionName: "post",
    //       args: [regionNumber, messageText.trim()],
    //     }),
    //   },
    // ];

    const calls = [
      {
        to: MYANMARPYI_ADDRESS,
        abi: MyanmarPyiABI,
        functionName: "post",
        args: [regionNumber, messageText.trim()],
        value: BigInt(0),
      },
    ];

    const capabilities = {
      paymasterService: {
        url:
          process.env.NEXT_PUBLIC_PAYMASTER_URL ||
          "https://api.developer.coinbase.com/rpc/v1/base-sepolia",
      },
    };

    setMessageText("");

    try {
      sendCalls({
        calls,
        chainId: baseSepolia.id,
        capabilities,
      });

      // Refetch to get the real data from blockchain
      // The event listener will also trigger a refetch
      setTimeout(() => refetchMessages(), 2000);
    } catch (error) {
      console.error("Error posting message:", error);
      // On error, refetch to restore correct state
      refetchMessages();
    }
  };

  const handleReaction = async (messageIndex: number, emoji: number) => {
    if (!isConnected || !contractReady) return;
    console.log(messageIndex);
    console.log(emoji);

    const calls = [
      {
        to: MYANMARPYI_ADDRESS,
        abi: MyanmarPyiABI,
        functionName: "reactEmoji",
        args: [regionNumber, BigInt(messageIndex), emoji],
        value: BigInt(0),
      },
    ];

    const capabilities = {
      paymasterService: {
        url:
          process.env.NEXT_PUBLIC_PAYMASTER_URL ||
          "https://api.developer.coinbase.com/rpc/v1/base-sepolia",
      },
    };

    sendCalls({
      calls,
      chainId: baseSepolia.id,
      capabilities,
    });

    // Update local count optimistically
    setReactionCounts((prev) => ({
      ...prev,
      [messageIndex]: {
        ...prev[messageIndex],
        [emoji]: (prev[messageIndex]?.[emoji] || 0) + 1,
      },
    }));
  };

  return (
    <div className="relative h-screen bg-white overflow-hidden">
      <main
        className={`relative w-full px-4 sm:px-6 lg:px-8 py-4 h-full flex flex-col gap-3 transition-opacity duration-500 ease-out ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero section */}
        <section className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            {t("title")}
          </h1>

          <p className="mx-auto my-5 max-w-2xl text-sm sm:text-base text-gray-600 leading-relaxed px-4">
            {t("subtitle")}
          </p>

          {account.status !== "connected" && (
            <button
              onClick={() => {
                const connector = connect.connectors[0];
                if (connector) connect.mutate({ connector });
              }}
              className="px-6 py-2 bg-rose-500 text-white text-sm font-medium rounded-lg hover:bg-rose-600 transition-colors duration-200 shadow-sm hover:shadow"
            >
              {t("connectButton")}
            </button>
          )}

          {/* Language toggle */}
          <div className="flex gap-3">
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                language === "en"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("my")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                language === "my"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              မြန်မာ
            </button>
          </div>
        </section>

        {/* Statistics Section */}
        {isConnected && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-4xl mx-auto w-full">
            <div className="rounded-lg border border-sky-200 bg-gradient-to-br from-sky-50 to-sky-100 p-2 text-center shadow-sm hover:shadow transition-shadow">
              <div className="text-xl font-bold text-sky-600 mb-0.5">
                {totalStats.users}
              </div>
              <div className="text-[10px] font-medium text-sky-700">
                {t("totalUsers")}
              </div>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-2 text-center shadow-sm hover:shadow transition-shadow">
              <div className="text-xl font-bold text-emerald-600 mb-0.5">
                {totalStats.messages}
              </div>
              <div className="text-[10px] font-medium text-emerald-700">
                {t("totalMessages")}
              </div>
            </div>
            <div className="rounded-lg border border-violet-200 bg-gradient-to-br from-violet-50 to-violet-100 p-2 text-center shadow-sm hover:shadow transition-shadow">
              <div className="text-xl font-bold text-violet-600 mb-0.5">
                {totalStats.emojis}
              </div>
              <div className="text-[10px] font-medium text-violet-700">
                {t("totalEmojis")}
              </div>
            </div>
          </section>
        )}

        {/* Main content grid */}
        <div className="grid gap-4 lg:grid-cols-2 flex-1 min-h-0 w-full">
          {/* Auth card - only shown when not connected */}
          {account.status !== "connected" && (
            <section className="rounded-xl border border-gray-200 bg-gray-50 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("welcome")}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-8">
                {t("welcomeMessage")}
              </p>

              <div className="flex flex-col gap-3">
                {connect.connectors.map((connector) =>
                  connector.name === "Base Account" ? (
                    <div key={connector.uid} className="w-full">
                      <SignInWithBase connector={connector} />
                    </div>
                  ) : (
                    <button
                      key={connector.uid}
                      onClick={() => connect.mutate({ connector })}
                      type="button"
                      className="w-full px-6 py-3 bg-rose-500 text-white font-medium rounded-lg hover:bg-rose-600 transition-colors duration-200"
                    >
                      Connect with {connector.name}
                    </button>
                  )
                )}
              </div>

              {connect.error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {connect.error.message}
                </div>
              )}
            </section>
          )}

          {/* Main interactive section */}
          <section
            className={`rounded-xl border border-gray-200 bg-white shadow-sm transition-opacity duration-300 flex flex-col min-h-0 ${
              account.status === "connected" ? "lg:col-span-2" : ""
            }`}
          >
            <div className="p-4 flex flex-col flex-1 min-h-0">
              {/* Status bar */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span
                      className={`block h-2.5 w-2.5 rounded-full ${
                        account.status === "connected"
                          ? "bg-emerald-500"
                          : "bg-gray-300"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-medium">
                      {account.status === "connected"
                        ? t("signedIn")
                        : t("notConnected")}
                    </p>
                  </div>
                </div>

                {account.status === "connected" && (
                  <button
                    type="button"
                    onClick={() => disconnect.mutate()}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {t("disconnect")}
                  </button>
                )}
              </div>

              {/* Map and Messages split view */}
              <div
                className={`transition-opacity duration-300 flex-1 min-h-0 flex flex-col ${
                  account.status === "connected" && showContent
                    ? "opacity-100"
                    : "opacity-50"
                }`}
              >
                <div className="grid gap-4 lg:grid-cols-[2fr_1fr] flex-1 min-h-0">
                  {/* Map panel */}
                  <div className="rounded-lg border border-gray-200 bg-gray-50 h-full min-h-0 shadow-sm">
                    <div className="flex h-full flex-col p-3 min-h-0">
                      <div className="mb-2">
                        <h3 className="text-xs font-semibold text-gray-900 mb-0.5">
                          {t("selectRegion")}
                        </h3>
                        <p className="text-[10px] text-gray-500">
                          {REGIONS.find((r) => r.id === selectedRegionId)
                            ?.name || t("noSelection")}
                        </p>
                      </div>

                      <div className="relative flex-1 overflow-hidden rounded-lg border border-gray-300 bg-white">
                        {isConnected ? (
                          <MyanmarMap
                            className="w-full h-full"
                            onRegionClick={(region) =>
                              setSelectedRegionId(region.id)
                            }
                            messageCounts={messageCounts}
                            selectedRegionId={selectedRegionId}
                          />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
                            <span className="text-3xl">🗺️</span>
                            <p className="text-sm">{t("connectToView")}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Messages panel */}
                  <div className="rounded-lg border border-gray-200 bg-gray-50 h-full min-h-0 shadow-sm">
                    <div className="flex h-full flex-col p-3 min-h-0">
                      <div className="mb-2">
                        <h3 className="text-xs font-semibold text-gray-900 mb-0.5">
                          {t("storiesFromRegion")}
                        </h3>
                        <p className="text-[10px] text-gray-500">
                          {language === "my"
                            ? REGIONS.find((r) => r.id === selectedRegionId)
                                ?.burmeseName || "—"
                            : REGIONS.find((r) => r.id === selectedRegionId)
                                ?.name || "—"}
                        </p>
                      </div>

                      {!contractReady && (
                        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                          <p className="font-medium mb-1">Setup required</p>
                          <p>
                            Set{" "}
                            <code className="bg-amber-100 px-1 py-0.5 rounded text-[10px]">
                              NEXT_PUBLIC_REGION_NOTES_ADDRESS
                            </code>{" "}
                            to enable message sharing.
                          </p>
                        </div>
                      )}

                      {/* Message composer */}
                      {(() => {
                        const selectedRegion = REGIONS.find(
                          (r) => r.id === selectedRegionId
                        );
                        const borderColor = selectedRegion
                          ? getRegionBorderColor(selectedRegion.colorClass)
                          : "border-rose-200";
                        const bgColor = selectedRegion
                          ? getRegionBgColor(selectedRegion.colorClass)
                          : "bg-rose-500";
                        const hoverBgColor = selectedRegion
                          ? getRegionHoverBgColor(selectedRegion.colorClass)
                          : "hover:bg-rose-600";
                        const textColor = selectedRegion
                          ? getRegionTextColor(selectedRegion.colorClass)
                          : "text-rose-500";

                        return (
                          <div
                            className={`mb-2 rounded-xl border-2 ${borderColor} bg-white p-2.5 shadow-sm hover:${borderColor} transition-colors`}
                          >
                            <textarea
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              placeholder={t("sharePrompt")}
                              className="w-full resize-none border-0 bg-transparent px-0 py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                              rows={2}
                              disabled={
                                !isConnected || !contractReady || isPosting
                              }
                              maxLength={200}
                            />
                            <div className="flex items-center justify-between text-[11px] pt-2">
                              <span
                                className={`font-medium ${
                                  messageText.length > 180
                                    ? "text-orange-500"
                                    : messageText.length > 0
                                    ? textColor
                                    : "text-gray-400"
                                }`}
                              >
                                {messageText.length}/200 {t("characterCount")}
                              </span>
                              <span className="text-gray-400">
                                {t("cooldownInfo")}
                              </span>
                            </div>
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <button
                                type="button"
                                onClick={handlePost}
                                disabled={
                                  !isConnected ||
                                  !contractReady ||
                                  isPosting ||
                                  !messageText.trim() ||
                                  messageText.length < 1 ||
                                  messageText.length > 200 ||
                                  regionNumber === 0
                                }
                                className={`w-full px-4 py-2.5 ${bgColor} text-white text-sm font-medium rounded-lg ${hoverBgColor} active:scale-98 transition-all duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-sm hover:shadow`}
                              >
                                {isPosting ? (
                                  <span className="flex items-center justify-center gap-2">
                                    <svg
                                      className="animate-spin h-4 w-4"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    {t("sharing")}
                                  </span>
                                ) : (
                                  t("shareButton")
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Messages feed */}
                      <div className="flex-1 overflow-y-auto rounded-lg border-2 border-gray-300 bg-white p-3 scroll-smooth">
                        {messagesLoading && (
                          <div className="flex flex-col items-center justify-center gap-2 py-8 text-gray-400">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-rose-500" />
                            <p className="text-xs">{t("loadingMessages")}</p>
                          </div>
                        )}

                        {!messagesLoading &&
                          (!messagesData ||
                            (messagesData as RegionNote[]).length === 0) && (
                            <div className="flex flex-col items-center justify-center gap-2 py-8 text-gray-400">
                              <span className="text-3xl">💬</span>
                              <p className="text-sm text-center">
                                {t("noMessages")}
                                <br />
                                {t("beFirst")}
                              </p>
                            </div>
                          )}

                        {!messagesLoading && messagesData && (
                          <ul className="space-y-2.5">
                            {(messagesData as RegionNote[]).map((m, idx) => (
                              <li
                                key={idx}
                                className="group relative p-3.5 bg-gradient-to-br from-white to-gray-50 rounded-lg border-2 border-gray-200 hover:border-gray-400 shadow-sm hover:shadow-lg transition-all duration-200"
                              >
                                {/* Header */}
                                <div className="mb-2.5 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
                                      {m.author.slice(2, 4).toUpperCase()}
                                    </div>
                                    <span className="font-mono text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                      {`${m.author.slice(
                                        0,
                                        4
                                      )}...${m.author.slice(-3)}`}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-gray-400">
                                    {new Date(
                                      Number(m.timestamp) * 1000
                                    ).toLocaleString()}
                                  </span>
                                </div>

                                {/* Message text */}
                                <p
                                  className={`text-sm leading-relaxed mb-2.5 pl-9 ${
                                    m.hidden
                                      ? "text-gray-400 line-through"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {m.text}
                                </p>

                                {/* Reaction buttons */}
                                <div className="flex flex-wrap gap-1.5 pl-9">
                                  {Object.entries(EMOJI_ICONS).map(
                                    ([emojiValue, icon]) => {
                                      const emojiNum = parseInt(emojiValue);
                                      const count =
                                        reactionCounts[idx]?.[emojiNum] || 0;
                                      const hasCount = count > 0;
                                      return (
                                        <button
                                          key={emojiValue}
                                          onClick={() =>
                                            handleReaction(idx, emojiNum)
                                          }
                                          disabled={
                                            !isConnected || !contractReady
                                          }
                                          className={`inline-flex items-center gap-1 px-1.5 py-1 text-xs rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                                            hasCount
                                              ? "bg-rose-50 border border-rose-200 hover:border-rose-300 hover:bg-rose-100"
                                              : "bg-gray-50 border border-gray-200 hover:border-rose-200 hover:bg-rose-50"
                                          }`}
                                        >
                                          <span className="text-sm leading-none">
                                            {icon}
                                          </span>
                                          {hasCount && (
                                            <span className="text-[10px] font-bold text-rose-600 min-w-3 text-center">
                                              {count}
                                            </span>
                                          )}
                                        </button>
                                      );
                                    }
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info banner */}
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
                  {t("infoBanner")}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-2 pt-2 border-t border-gray-200 w-full">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-sm text-gray-700">{t("madeWith")}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <a
                  href="https://base.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-700 transition-colors duration-200"
                >
                  {t("poweredBy")}
                </a>
                <span>•</span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-700 transition-colors duration-200"
                >
                  {t("github")}
                </a>
              </div>

              <div className="text-xs text-gray-400">
                © {new Date().getFullYear()} Nyi Lynn Htwe
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
