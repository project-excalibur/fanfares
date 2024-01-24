"use client"

import { AudioPlayer } from "@/app/components/AudioPlayer"
import Button from "@/app/components/Button"
import { MediaThumbnailUploadField } from "@/app/components/MediaThumbnailUploadField"
import {
  faAlignLeft,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { config } from "@fortawesome/fontawesome-svg-core"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  usePlayerPageActions,
  usePlayerPageError,
  usePlayerPageGateId,
  usePlayerPageIsLoading,
  usePlayerPageIsPlaying,
  usePlayerPagePodcast,
} from "@/app/controllers/state/player-page-slice"
import { useNostr } from "@/app/controllers/state/nostr-slice"
import {
  useAccountNostr,
  useAccountWebln,
} from "@/app/controllers/state/account-slice"

config.autoAddCss = false /* eslint-disable import/first */

function getIdFromUrl(pathname: string) {
  const split = pathname.split("/")
  return split[split.length - 1]
}

function formatDate(date: Date): string {
  // Array of month abbreviations
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  // Extracting day, month, and year from the date
  const day = date.getDate().toString().padStart(2, "0")
  const month = months[date.getMonth()]
  const year = date.getFullYear().toString().substring(2)

  // Formatting the date
  return `${day} ${month}, ${year}`
}

export default function PlayerPage() {
  const isPlaying = usePlayerPageIsPlaying()
  const gateId = usePlayerPageGateId()
  const accountNostr = useAccountNostr()
  const webln = useAccountWebln()
  const { nostrPool, nostrRelays } = useNostr()
  const {
    playerPageSetGateId,
    playerPageBuyPodcast,
    playerPageUnlockPodcast,
    playerPageSetPlaying,
  } = usePlayerPageActions()
  const playerPageIsLoading = usePlayerPageIsLoading()
  const podcast = usePlayerPagePodcast()
  const playerPageError = usePlayerPageError()
  const playerPageIsPlaying = usePlayerPageIsPlaying()
  const pathname = getIdFromUrl(usePathname())
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (gateId !== pathname)
      playerPageSetGateId(nostrRelays, nostrPool, pathname)
  }, [pathname, gateId, nostrRelays, nostrPool])

  useEffect(() => {
    if (
      accountNostr &&
      podcast &&
      !podcast.audioFilepath &&
      accountNostr.accountNIP04 &&
      accountNostr.accountPublicKey
    ) {
      playerPageUnlockPodcast(
        nostrRelays,
        nostrPool,
        podcast,
        accountNostr.accountNIP04,
        accountNostr.accountPublicKey
      )
    }
  }, [nostrRelays, nostrPool, accountNostr, podcast])

  const buyPodcast = () => {
    if (!podcast) {
      alert("Podcast not found")
      return
    }
    if (
      !accountNostr ||
      !accountNostr.accountNIP04 ||
      !accountNostr.accountNIP07 ||
      !accountNostr.accountPublicKey ||
      !webln
    ) {
      alert("You need to login first")
      return
    }
    playerPageBuyPodcast(
      nostrRelays,
      nostrPool,
      podcast,
      accountNostr.accountNIP04,
      accountNostr.accountNIP07,
      accountNostr.accountPublicKey,
      webln
    )
  }

  const [currentUrl, setCurrentUrl] = useState<string>("")

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const copyToClipboard = async (text: string) => {
    setCopied(true)

    setTimeout(() => setCopied(false), 1000)

    navigator.clipboard.writeText(text)
  }

  const renderBuy = () => {
    if (!podcast) return null

    return (
      <div className="flex flex-col items-center justify-center  h-full">
        <Button
          aria-label="Buy"
          id={"E2EID.playerBuyButton"}
          label={"Buy this Podcast"}
          className="px-2 text-xs md:px-4 md:text-base"
          onClick={buyPodcast}
        />
        <p className="text-xs font-bold text-center text-white mt-2">
          It cost's {podcast.gate.cost} sats
        </p>
      </div>
    )
  }

  const renderActionMenu = () => {
    if (!podcast) return null
    if (!podcast.audioFilepath) return renderBuy()

    return (
      <div className="flex gap-4">
        <button
          aria-label="Play"
          id={"E2EID.playerPlayButton"}
          onClick={() => {
            if (playerPageIsPlaying) {
              playerPageSetPlaying(false)
            } else {
              playerPageSetPlaying(true)
            }
          }}>
          <FontAwesomeIcon
            className="w-10 md:w-14"
            icon={playerPageIsPlaying ? faPauseCircle : faPlayCircle}
          />
        </button>

        <div className="flex flex-row items-center justify-center gap-2 my-auto md:gap-2">
          <div className="flex items-center gap-2">
            {/* <Button
              aria-label="Make a donation"
              id={"E2EID.playerDonateButton"}
              label={"Contribute ⚡️"}
              className="px-2 text-xs md:px-4 md:text-base"
              onClick={() => {}}
            /> */}
            <Button
              aria-label="Share episode on Socials"
              id={"E2EID.playerShareButton"}
              className="px-2 text-xs md:px-4 md:text-base"
              onClick={() => copyToClipboard(currentUrl)}
              label={copied ? "Copied" : "Copy Link"}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderError = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-3xl font-bold text-center text-white">
          Error loading podcast...
        </p>
        <p className="text-3xl font-bold text-center text-white">
          {playerPageError}
        </p>
      </div>
    )
  }

  const renderLoading = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-3xl font-bold text-center text-white">
          Loading podcast...
        </p>
      </div>
    )
  }

  const renderPodcastNotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-3xl font-bold text-center text-white">
          Podcast not found...
        </p>
      </div>
    )
  }

  const renderContent = () => {
    if (playerPageError) return renderError()
    if (playerPageIsLoading) return renderLoading()
    if (!podcast) return renderPodcastNotFound()

    return (
      <>
        <div className="flex items-start w-full max-w-5xl gap-8">
          <div className="w-60 h-60 flex flex-col gap-2">
            <img
              src={podcast.imageFilepath}
              alt=""
              className="rounded-2xl object-cover w-full h-full"
            />
            <div className="flex justify-between">
              <p className="text-center ml-auto">
                {formatDate(
                  new Date(podcast.announcement.note.created_at * 1000)
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col w-full mb-4 space-y-4 text-sm text-skin-muted">
              <p className="lg:text-2xl lg:font-bold">{podcast.title}</p>
              <p className="lg:text-base lg:font-bold truncate w-80">
                {podcast.announcement.note.pubkey}
              </p>

              <div
                className={`w-full max-w-lg items-start rounded-lg bg-skin-fill/80 p-2 space-y-2`}>
                <div className="flex">
                  <button
                    aria-label="Expand description"
                    className="mr-2"
                    type="button">
                    <FontAwesomeIcon icon={faAlignLeft} className="w-4" />
                  </button>
                  <p className="">Description</p>
                </div>
                <p>{podcast.description}</p>
                {/* <button
                  aria-label="Expand description"
                  type="button"
                  className={`text-xs font-thin block ml-auto`}>
                  {"showMore" ? "Hide..." : "Show more..."}
                </button> */}
              </div>
            </div>

            {renderActionMenu()}
          </div>
        </div>
        <hr className="w-full mt-4 mb-4 border-buttonDisabled/40 " />
        <AudioPlayer />
      </>
    )
  }

  return (
    <section className="flex w-full flex-col space-y-12">
      <h1 className="font-black text-center text-gray-100 text-xl/4 md:mt-4 md:text-start md:text-4xl">
        Player Page
      </h1>
      {renderContent()}
    </section>
  )
}
