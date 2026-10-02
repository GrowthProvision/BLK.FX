import clientPawa from "@/assets/client-pawa.png.asset.json";
import clientMedia from "@/assets/client-media-exchange.png.asset.json";
import clientTestGorilla from "@/assets/client-testgorilla.png.asset.json";
import clientSixes from "@/assets/client-sixes.png.asset.json";
import clientConnect from "@/assets/client-connect.png.asset.json";
import clientMahiki from "@/assets/client-mahiki.png.asset.json";
import clientStudio from "@/assets/client-studiob.png.asset.json";
import clientEco from "@/assets/client-eco.png.asset.json";
import clientPress from "@/assets/client-press.png.asset.json";
import clientThrive from "@/assets/client-thrive.png.asset.json";
import clientCoconut from "@/assets/client-coconut.png.asset.json";
import clientSm from "@/assets/client-sm.png.asset.json";
import clientMisfits from "@/assets/client-misfits.png.asset.json";
import clientFurniture from "@/assets/client-furniture.png.asset.json";
import clientEmj from "@/assets/client-emj.png.asset.json";
import clientSidemen from "@/assets/client-sidemen.png.asset.json";
import currencycloudLogo from "@/assets/provider-currencycloud.png.asset.json";
import equalsLogo from "@/assets/provider-equals.png.asset.json";
import gcLogo from "@/assets/provider-gc.png.asset.json";
import eburyLogo from "@/assets/provider-ebury.svg.asset.json";
import sciopayLogo from "@/assets/provider-sciopay.svg.asset.json";
export { posts, type InsightCategory, type InsightPost } from "@/content/posts";

export const FEE_RANGE = "0.2–0.6%";
export const BANK_RANGE = "1.0–3.5%";
export const PAYMENT_FEES = { bank:"£15 / €20 / $20", blk:"£0 / €0 / $0" } as const;
export const intermediaryDisclosure = "BLK.FX LTD operates as a fintech intermediary and collaborates with regulated financial providers (including Currencycloud, Ebury, Equals and GC Partners) to deliver multi-currency solutions and international payment services. BLK.FX does not provide regulated financial advice and acts as an intermediary; services are provided under the regulatory permissions of its partners.";
export const pricingSummary = `High street banks commonly build ${BANK_RANGE} into the rate. BLK.FX keeps conversion rates very competitive, typically ${FEE_RANGE}.`;
export const bookingUrl = "https://meetings.hubspot.com/ben-kohler/intro-call-ben";
export const privacyUrl = "https://blkfx.co.uk/wp-content/uploads/2026/02/BLK.FX-Website-Privacy-Policy-.pdf";
export const brochureUrl = "https://blkfx.co.uk/wp-content/uploads/2026/04/BLK.FX-Corporate-Brochure-2026.pdf";

export const services = [
  { id:"business-foreign-exchange", number:"01", verb:"Convert", title:"Business Foreign Exchange", text:"Buy and sell 35+ currencies at very competitive rates, with timing thought through rather than left to the invoice date.", bullets:["Spot, forwards and orders","Very competitive rates on every conversion","Market analysis on your pairs","24/7 dedicated support"] },
  { id:"international-payments", number:"02", verb:"Send", title:"International Payments", text:"Receive and send payments internationally with less friction. Payments are completely free, often routed locally, and arrive the same day up to next day.", bullets:["£0 / €0 / $0 payment fees","Faster Payments, SEPA, SWIFT and ACH","Same day, up to next day","24/7 support when needed"] },
  { id:"multi-currency-accounts", number:"03", verb:"Hold", title:"Multi-Currency Accounts", text:"Hold multiple currencies in one place; useful if you get paid or make payments overseas. Named accounts include their own IBANs and account numbers.", bullets:["Opened in your entity's name","No setup or maintenance fee","GBP, USD, EUR, CHF, AED and more","Suitable for SPVs and trusts"] },
  { id:"fx-risk-management-hedging", number:"04", verb:"Protect", title:"FX Risk Management & Hedging", text:"Exchange rates move all the time. Hedging is simply a plan to reduce surprises by fixing some or all of a future rate, so you are not exposed later.", bullets:["Full or partial protection","Forwards and spot conversions","Budget rate strategy","Free modelling on FX.Exposure"] },
  { id:"commercial-finance", number:"05", verb:"Fund", title:"Commercial Finance", text:"Facilities through partner lenders, so fixing a rate or bridging a completion does not tie up your working capital.", bullets:["Through partner lenders","Pairs with forward contracts","Subject to a conversation","24/7 dedicated support"] },
  { id:"private-client-fx", number:"06", verb:"Personal", title:"Private Client FX", text:"Built for international families, globally mobile professionals, UHNW individuals and touring talent, with discreet, high-touch support when transfers are time-sensitive.", bullets:["Property and high-value assets","Fee-free account transfers","Regular international payments","24/7 private-style support"] },
] as const;
export const consultancyLine = "Consultancy for every client — treasury management to streamline cash flow, enhance liquidity and improve financial decision-making.";

export const capabilities = [
 ["Multi-currency accounts","Hold multiple currencies in one place; useful if you get paid or make payments overseas."],
 ["Get paid and pay internationally","Receive and send payments internationally with less friction."],
 ["Competitive FX execution","Better execution can make a real difference, especially at scale."],
 ["Fast payments","Same-day payments where possible, so money arrives when it is needed."],
 ["Currency risk planning","We help you plan around currency movements and reduce unwanted shocks."],
 ["24/7 direct support","Reach out to the team anytime; we can help process conversions and payments."],
] as const;

export const providers = [
 {id:"currencycloud",name:"Currencycloud",displayName:"Currencycloud",loginLabel:"Currencycloud",detail:"Visa-owned and FCA-regulated, Currencycloud provides secure multi-currency accounts, international payments and safeguarded client funds.",logo:currencycloudLogo.url,signup:"https://onboarding.paydirect.io/blk_fx_ltd/forms/corporate",personalSignup:"https://onboarding.paydirect.io/blk_fx_ltd/forms/individual",login:"https://blkfx.paydirect.io/",quickLogin:"https://blkfx.paydirect.io/login",security:"https://www.currencycloud.com/legal/security/",terms:"https://www.currencycloud.com/legal/terms/",help:"https://www.currencycloud.com/company/resources/",fca:"https://register.fca.org.uk/s/firm?id=001b000000m6y0WAAQ"},
 {id:"gc-partners",name:"GC Partners",displayName:"GC Partners (Numito)",loginLabel:"GC Partners · Numito",detail:"GC Partners powers Numito, processing more than $7.5 billion and 300,000 payments each year while keeping client funds separate from corporate assets.",logo:gcLogo.url,signup:"https://blkfx.numito.com/onboarding",login:"https://blkfx.numito.com/",quickLogin:"https://blkfx.numito.com/login",security:"https://www.gcpartners.co/security/",terms:"https://www.gcpartners.co/new-terms-and-conditions-business/",help:"https://help.numito.com/category/38-faqs",fca:"https://register.fca.org.uk/s/firm?id=001b000000MftF1AAJ"},
 {id:"equals",name:"Equals",displayName:"Equals",loginLabel:"Equals",detail:"Equals has served more than one million customers and 20,000 businesses since 2005, combining global payments with robust account infrastructure.",logo:equalsLogo.url,signup:"https://blkfx.equalsconnect.com/account/open",login:"https://blkfx.equalsconnect.com/account/login",quickLogin:"https://blkfx.equalsconnect.com/account/login",security:"https://equalsmoney.com/security",terms:"https://blkfx.equalsconnect.com/terms-and-conditions#contract18",help:"https://equalsmoney.com/faq",fca:"https://register.fca.org.uk/s/firm?id=001b000000k3uISAAY"},
 {id:"ebury",name:"Ebury",displayName:"Ebury",loginLabel:"Ebury",detail:"Ebury supports more than 24,000 clients and over £23 billion in annual transactions across international payments, collections and risk management.",logo:eburyLogo.url,signup:"https://apply.ebury.com/sfdc/servlet/SmartForm.html?formCode=currency-services&brand=BLK",login:"https://oblkfxltd.ebury.com/login/?next=/",quickLogin:"https://oblkfxltd.ebury.com/login/?next=/",security:"https://help.ebury.com/en/collections/1926395-privacy-and-security",terms:"https://drive.google.com/file/d/1-Jt4RTGqIQ6IlnxhEYwEMW_IIIobsfAs/view",help:"https://help.ebury.com/en/",fca:"https://register.fca.org.uk/s/firm?id=001b000003pvOlCAAU"},
 {id:"sciopay",name:"Sciopay",displayName:"Sciopay",loginLabel:"Sciopay",detail:"Sciopay supports conversion in 50+ currencies and settlement in 35+ currencies through multi-currency IBANs, with MFA and real-time monitoring.",logo:sciopayLogo.url,signup:"https://blkfx.sciopay.co/clientregistration",login:"https://blkfx.sciopay.co/login",quickLogin:"https://blkfx.sciopay.co/login",security:"https://sciopay.co/",terms:"https://sciopay.co/legal/terms-and-conditions.html",help:"https://sciopay.co/support/contact-us.html",fca:"https://register.fca.org.uk/s/firm?id=0014G00002WKY9sQAH"},
] as const;

export const clients = [
 ["Pawa Tech",clientPawa.url,"mono",1.08],["Media Exchange Group",clientMedia.url,"mono",1.05],["TestGorilla",clientTestGorilla.url,"mono",1],["Sixes Social Cricket",clientSixes.url,"mono",1.08],["Connect Management",clientConnect.url,"mono",1.08],["Mahiki",clientMahiki.url,"mono",.94],["Studio B",clientStudio.url,"mono",1.1],["Eco Atlantic Oil & Gas",clientEco.url,"soft",1.04],["Press London",clientPress.url,"mono",1.08],["Thrive Learning",clientThrive.url,"mono",1.04],["Coconut Lane",clientCoconut.url,"soft",1],["SM Creps",clientSm.url,"mono",1.04],["Misfits Health",clientMisfits.url,"mono",1.06],["Furniture Fusion",clientFurniture.url,"mono",1],["EMJ Exclusive",clientEmj.url,"soft",1.02],["XIX The Sidemen",clientSidemen.url,"mono",1.08],
] as const;

export const benefits=["Free international payments","No hidden fees – ever","24/7 dedicated customer service","Institutional-grade FX rates","Multi-currency accounts","Support for 35+ currencies","Transparent, regulated, trusted"] as const;
export const differences=[
 ["Zero-fee multi-currency accounts","Local accounts in GBP, EUR, USD, CAD and more – with no setup or maintenance fees."],
 ["Highly competitive FX rates",`We charge just ${FEE_RANGE} on average – far below high-street banks.`],
 ["Dedicated account managers","Real people. No bots. Full support, day or night."],
  ["Fast payments in 35+ currencies","Same day, up to next day. Global reach, with a person tracking the payment."],
 ["FX strategy & risk management","Lock in certainty and plan ahead – rather than react to volatility."],
] as const;
export const valuePillars=[
  {kicker:"Service",title:"24/7 dedicated support",text:"Every client, every day. Reach our customer service team by phone, email or WhatsApp whenever a payment or decision needs attention."},
 {kicker:"Structures",title:"Trusts and funds welcome",text:"SPVs, trusts, funds and venture capital structures can require heavier compliance work. BLK.FX already supports these structures."},
 {kicker:"Judgement",title:"Timing, not just execution",text:"A view on the currencies you are exposed to, and a conversation about when to convert. That conversation costs nothing."},
 {kicker:"Regulation",title:"Regulated partners only",text:"Execution through regulated partners across the UK, the EEA and the US, with the compliance work done properly rather than quickly."},
] as const;
export const whyBlkFx=[
 ["Fees","Free international payments and no account opening or maintenance fees."],["Exchange rates","Very competitive FX execution can make a real difference, especially at scale."],["Speed","Same-day payments where possible, so money arrives when it is needed."],["Support","24/7 service and a dedicated contact – no waiting on hold."],["Reliability","A practical approach for clients operating across different sectors and risk profiles."],["Onboarding","Account opening can typically take 24–48 hours."],["Risk support","Education and consultancy to help understand and manage foreign currency exposure."],["Multi-currency","Named multi-currency accounts and local collection options to simplify international trading."],
] as const;
export const currencyAccounts=["🇬🇧 GBP","🇺🇸 USD","🇪🇺 EUR","🇨🇭 CHF","🇦🇪 AED","and many more…"] as const;
export const featuredTestimonial={quote:"BLK.FX have been working with us to improve the way we manage our international finances. It helps us immensely to have a multi-currency account ecosystem, particularly a Dollar account, to collect income for the group within the United States. BLK provide us with great rates to save us money, and consistently offer first class customer service we can rely on 24/7.",author:"Sam Uwins",company:"Arcade Media, Sidemen Management"} as const;
export const hedgingApproaches=[["Full protection","Lock in all of a future amount."],["Partial protection","Lock in some, keep some flexible."],["Spread it out","Combine forwards and spot conversions to smooth the average rate over time."]] as const;
export const founderContent={heading:"Meet Ben, the Founder of BLK.FX",strapline:"Built for people who move money internationally – and don't want the runaround.",why:"After 10+ years in FX and finance, I kept seeing the same problem: high fees, unclear exchange rates, and support that disappears when it matters most. BLK.FX was created to make international payments clearer, faster and easier for everyone, from first-time senders to experienced finance teams.",mission:"To combine the best financial technology with direct access when something is time-sensitive, so clients can hold, receive, convert and send money globally – simply.",expectations:["A 24/7 direct line when something is time-sensitive","Practical guidance to reduce “currency surprises”","A setup designed to remove friction from global payments","A service that stays human, even when the numbers are big"]} as const;
export const furnitureFusion={intro:"A leading contract furniture company and go-to supplier for the best hotel, restaurant and hospitality providers all over the world, from Europe to Asia and the Americas.",challenge:["Paying and collecting in multiple currencies across global suppliers and clients","FX costs and payment fees adding up over time","Manual reconciliation and payment delays creating extra admin and stress"],work:["Removed transaction fees and improved the FX margin","Identified exposures and used forward contracts to lock rates for planning","Introduced a streamlined platform to reduce reconciliation workload"],results:[[25000,"£"," saved per year, approximately"],[1,"Up to "," hour saved each day"],[0,"","More predictable forecasting using forwards"],[0,"","Smoother supplier payments, including same-day where possible"]]} as const;
export const reasonsClientsStay=["Save 5–6 figures annually in FX costs","Mitigate risk and protect margins","Payments in over 30 countries","Real answers – not a generic service"] as const;
export const audiences=[
 {id:"business",title:"Businesses and finance teams",text:"PE-backed and scaling, founder-led with no treasury team, or a finance director who wants the margin in writing. CFOs, FDs and treasury leads at businesses with 1–500 employees and multi-jurisdiction operations."},
 {id:"structures",title:"SPVs, including property SPVs",text:"Accounts in the vehicle's own name, completion payments handled to a deadline, and forwards so the rate cannot move between exchange and completion."},
 {id:"funds",title:"Trusts and funds",text:"Trust distributions and fund capital calls both need heavier onboarding. BLK.FX already supports both, paid out in the currency the beneficiary or investor needs, on dates that cannot slip."},
 {id:"venture",title:"Venture capital",text:"You raise in one currency and your portfolio spends in another. Fix the rate on committed capital so a move does not shorten a runway."},
 {id:"private",title:"Private clients and property abroad",text:"HNW individuals, investors, family offices, touring artists, athletes and their agents. The rate fixed before you commit, the payment landing on the completion date, and a person on the phone when a lawyer needs confirmation."},
] as const;
export const audienceHighlights=[
 {id:"business-finance-teams",title:"Business & Finance Teams",text:"CFOs, FDs and treasury teams protecting margin across international revenue and costs."},
 {id:"spvs-trusts-funds",title:"SPVs, Trusts & Funds",text:"Entity-name accounts, detailed onboarding and payments tied to hard deadlines."},
 {id:"private-clients-property",title:"Private Clients & Property",text:"High-value transfers, overseas property and family wealth with a named specialist."},
 {id:"music-entertainment",title:"Music & Entertainment",text:"Touring artists, events and agents managing fees, suppliers and budgets in multiple currencies."},
 {id:"creators-influencers",title:"Creators & Influencers",text:"International platform revenue and global payouts through an account built around the currencies you earn."},
] as const;
export const hiddenFxCosts=[
 ["Hidden margins","Banks rarely charge a visible fee. The cost is built into the rate, often 1–3.5%, and it is taken on every conversion."],
 ["Timing","Converting on the invoice date is a decision, just not a deliberate one. A market view and a plan can be worth more than a better rate."],
 ["Payment routing","Intermediary banks can deduct charges on the way, so the beneficiary receives less. We route locally where possible."],
 ["Delays and missing payments","A stuck payment costs relationships, not just money. You have a named person who investigates and chases, 24/7."],
 ["Budget risk","A 5% currency move can wipe out a margin you have already reported. Forward contracts fix the rate so the budget holds."],
 ["Service when it matters","Weekends, completions, deadlines. Real people, no bots, day or night."],
] as const;
export const processSteps=[
 ["01","A call, not a form","Thirty minutes with our team on what you buy, what you sell and when. You leave with a view on your exposure whether you go ahead or not. Try before you wire."],
 ["02","Accounts opened","Multi-currency accounts in your own name, via fast, secure online onboarding, with the compliance work handled properly rather than quickly."],
 ["03","Trade, with someone on the end of it","Convert, send and hedge with a named specialist and 24/7 dedicated customer service by phone, email and WhatsApp."],
] as const;

export const reviews=["Game changer for me, absolutely love the set up and the service – speed is just stunning and top drawer","I received amazing service from BLK.FX. My exchange rates were far better than my bank and my payment was received in Spain within 15 minutes.","Blk offers exceptional service and bests all other FX rates I have access to. Great service and support.","Ben is fantastic and very personable. His weekly updates via email keep me informed and up-to-date","A breath of fresh air to the banking world, a disruptor of the best kind. Love the service, speed, efficiency and rates","Extremely clear and professional advice. Very efficient if I needed anything done.","Ben is really good at getting on top of problems and saved me a lot of unnecessary fees in my first payments overseas to the US.","I use the currency accounts provided by BLK.FX for all my international revenue and payments… better and cheaper than any high street bank or financial institution.","Been using BLK.FX for all my international payments for a while now. Excellent user interface, easy reporting, support and timely payments.","Fantastic service, really responsive in an ever changing world of currency.","Have dealt with Ben for a number of years – good guy and provides a great service. Recommended."] as const;

export const faqs=[
 ["What does a foreign exchange consultancy actually do?","A foreign exchange consultancy sits between your business and the market, and is paid on the conversion rather than on advice. BLK.FX opens multi-currency accounts, moves money across borders, and helps finance teams decide when to convert and how much risk to carry. We are not a bank and we are not a software platform."],
  ["How much does it cost to send money internationally?",`BLK.FX international payments are free: £0 / €0 / $0 payment fees. The only cost is a very competitive FX margin, typically ${FEE_RANGE}. A high street bank typically charges around £15 / €20 / $20 per payment, plus ${BANK_RANGE} built into the exchange rate. Typical bank charges vary by bank.`],
 ["What is hedging, and does my business need it?","Hedging means fixing some or all of a future exchange rate now, so a currency move cannot damage a budget you have already set. If you buy or sell in a currency other than the one you report in, and you plan more than a month ahead, you are carrying currency risk whether you have named it or not."],
 ["Can you work with trusts, funds and SPVs?","Yes. BLK.FX supports structures including trusts, funds, property SPVs and venture capital vehicles. These structures can involve more detailed compliance and onboarding, which BLK.FX is set up to handle."],
  ["How quickly do international payments arrive?","BLK.FX payments arrive the same day, up to next day. A high street bank can take the same day, up to 5 working days."],
 ["Are my funds safe?","Funds are held with FCA-regulated EMIs and payment institutions that safeguard client money separately from their own; see FinTech Providers."],
  ["Is support really 24/7?","Yes. Every client has access to our dedicated customer service team 24/7 by phone, email and WhatsApp, including weekends."],
  ["How quickly can I open an account?","Account opening can typically take 24–48 hours."],
] as const;

export const aiLinks=[
 ["ChatGPT","https://chatgpt.com/?q="],["Claude","https://claude.ai/new?q="],["Gemini","https://gemini.google.com/app?q="],["Perplexity","https://www.perplexity.ai/search?q="],["Grok","https://x.com/i/grok?text="],
] as const;