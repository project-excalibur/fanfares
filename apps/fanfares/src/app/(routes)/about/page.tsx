export default function AboutPage() {
  return (
    <div className="space-y-4 pb-40 md:pb-0">
      <div className="flex flex-col items-center px-4 py-8 max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-gloock font-bold text-center ">
          About FanFares.io
        </h1>
        <div className="space-y-4 text-gray-100">
          <p>
            At FanFares.io, we are a small team of 4 people building a Nostr
            client. We are creating the ability for podcasters to put specific
            items of content behind Bitcoin lightning paywalls. This can work
            well for premium content, of the type that you might have put on
            Patreon or a Substack subscription.
          </p>
          <p>
            Listeners can use Bitcoin lightning as a currency to buy an episode
            by using zaps on Nostr.
          </p>
        </div>

        <h2 className="text-2xl font-semibold font-gloock">Use Cases</h2>
        <div className="space-y-4 text-gray-100">
          <p>
            <strong>1.</strong> The second episode of a two part podcast could
            be uploaded to FanFares.io and never released onto RSS. The
            listeners can hear the first part of the story/interview on any free
            podcast app and be encouraged to spend a small amount of Bitcoin to
            hear the rest. A link in the description will take them to the
            second part podcast on FanFares.io.
          </p>
          <p>
            <strong>2.</strong> Content that goes out for free on RSS with
            adverts polluting the content, could be uploaded to FanFares as an
            ad-free version where listeners pay with Bitcoin to gain access. How
            much is 5 minutes of your life worth? Time is the only thing that is
            more scarce than Bitcoin.
          </p>
          <p>
            <strong>3.</strong> Content can be released early on FanFares as a
            paid version a couple of weeks before it is released on RSS.
          </p>
        </div>

        <h2 className="text-2xl font-semibold font-gloock">Economic Model</h2>
        <div className="space-y-4 text-gray-100">
          <p>
            The closest project to what we are doing is Fountain.fm, where
            listeners can tip the creator for free content that is available on
            every podcasting app. Monetisation for podcasters using this method
            has been modest so far. The reality is, that people playing for tips
            never really make much money. Creatives that have sold books and
            CDs, have made a lot of money in the past, albeit the publishers and
            the record companies took most of it. The Fanfares economic model is
            closer to pre-internet commerce, where you pay for something and
            then you get it. The difference is, that there is no middle man
            controlling your payments, they are instant and direct using the
            Bitcoin peer to peer payment system. With Nostr, there is no
            platform that can censor you, your content is held in an encrypted
            format on decentralised servers and it is only accessible to
            listeners that have paid for the decryption key.
          </p>
          <p>
            If listeners are pleased with the content that they have purchased
            on Fanfares.io, then they have the option to repost a referral link
            and potentially earn a split of revenue that emanates from their
            recommendations. This advanced feature is likely to give a viral
            reach to podcasters that publish on Fanfares.io. Reposts could go
            beyond Nostr, as the link can be copied and posted on platforms like
            Twitter or Facebook where some people have millions of followers.
          </p>
        </div>

        <h2 className="text-2xl font-semibold font-gloock">
          Community and Growth
        </h2>
        <div className="space-y-4 text-gray-100">
          <p>
            FanFares.io is an open source project and we are building a
            community by spreading the word through existing Nostr users and by
            reaching onto Web 2 social media platforms. Listeners will be
            encouraged to learn about bitcoin, because FanFares.io is itself a
            clear and indisputable use case for Bitcoin as a payment system.
            Creators will see the value in having a Nostr account and a Bitcoin
            wallet, because that enables them to get paid directly for their
            work. People that have never owned Bitcoin, can earn it without
            needing to go onto an exchange. They can do proof of work, by
            discovering quality content and recommending it to their network.
          </p>
        </div>

        <h2 className="text-2xl font-semibold font-gloock">Future Plans</h2>
        <div className="space-y-4 text-gray-100">
          <p>
            Bitcoin lightning enables micropayments with minuscule transactions
            fees and automatic payment splits which have never been possible
            with fiat money. We hope to build this system beyond podcasting to
            all forms of digital media.
          </p>
        </div>
      </div>
    </div>
  )
}
