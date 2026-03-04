import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, HelpCircle, Package, MessageCircle, MapPin, Truck, Shield, CreditCard, User, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQCategory {
    id: string;
    icon: React.ReactNode;
    title: string;
    color: string;
    questions: FAQItem[];
}

const faqCategories: FAQCategory[] = [
    {
        id: "delivery",
        icon: <Package className="h-5 w-5" />,
        title: "Delivery & Meetups",
        color: "from-violet-500 to-purple-600",
        questions: [
            {
                question: "How does delivery work on Yavuli?",
                answer:
                    "Delivery on Yavuli is managed directly between the buyer and seller — no middleman. Once you agree on a deal, both parties connect via call or chat (our built-in messaging) to decide a time and place to meet. It's simple, fast, and personal.",
            },
            {
                question: "Where do we meet for campus transactions?",
                answer:
                    "For same-campus transactions, after agreeing on a deal, call or chat with the other party and pick a convenient spot on campus — a cafeteria, library lobby, dorm entrance, or any safe, public area you both know. The key is to choose a place that's comfortable and visible.",
            },
            {
                question: "What if the buyer and seller are on different campuses?",
                answer:
                    "For inter-campus transactions, you have two options: (1) Arrange a meet-up at a mutually convenient location between your campuses, or (2) Arrange delivery through a third-party courier service yourself. We are currently in the process of partnering with delivery services to make this seamless for you! Until then, you can discuss and arrange delivery logistics over call or chat before confirming.",
            },
            {
                question: "Does Yavuli handle delivery itself?",
                answer:
                    "Yavuli does not personally deliver items. We are currently in the process of partnering with delivery services to bring integrated shipping to the platform! For now, local campus meets are a direct handoff, and for inter-campus or distant transactions, buyers and sellers need to arrange delivery and agree on charges themselves.",
            },
            {
                question: "Are there any delivery charges?",
                answer:
                    "For same-campus meetups, there are no delivery charges — just meet up and exchange! For inter-campus deliveries, since you will arrange shipping yourself for now (our integrated delivery partner services are coming soon!), charges will depend on the third-party courier service you choose based on weight and distance. Always confirm delivery arrangements and charges with the other party before proceeding.",
            },
        ],
    },
    {
        id: "communication",
        icon: <MessageCircle className="h-5 w-5" />,
        title: "Communication & Coordination",
        color: "from-sky-500 to-blue-600",
        questions: [
            {
                question: "How do I contact a buyer or seller?",
                answer:
                    "You can message them directly through Yavuli's built-in chat. Just open the listing and tap the 'Message Seller' button. You'll get real-time messaging right here on the platform. For quick coordination, you can also share your phone number within the chat to arrange a call.",
            },
            {
                question: "Can I call the seller/buyer directly?",
                answer:
                    "Yes! While Yavuli provides in-app messaging, you're free to share contact details in chat and coordinate over a phone call. For deciding meetup times, locations, or delivery preferences, a quick call often works best.",
            },
            {
                question: "What should I discuss before meeting?",
                answer:
                    "Before meeting, confirm: (1) The item's condition matches the listing, (2) The agreed price, (3) The meetup time and place, (4) Payment method (cash is common for campus meets), and (5) If shipping, the delivery partner, cost, and estimated time.",
            },
        ],
    },
    {
        id: "safety",
        icon: <Shield className="h-5 w-5" />,
        title: "Safety & Trust",
        color: "from-emerald-500 to-green-600",
        questions: [
            {
                question: "Is it safe to meet strangers for transactions?",
                answer:
                    "Safety is our priority. Always meet in public, well-lit areas on campus (cafeterias, libraries, main gates). Never go alone to isolated spots. Yavuli is designed for student communities — everyone is a verified college student, but common sense goes a long way. When in doubt, bring a friend.",
            },
            {
                question: "What if the item doesn't match the description?",
                answer:
                    "Before handing over money, inspect the item thoroughly. If it doesn't match the listing description, you're not obligated to buy it. We encourage honest listings — misrepresenting items can get a seller's account reported and reviewed. Use our in-app report feature if you encounter fraud.",
            },
            {
                question: "How are users verified on Yavuli?",
                answer:
                    "All Yavuli users sign up with their college email or credentials, ensuring that everyone on the platform is a genuine student. This creates a trusted community of buyers and sellers within the student ecosystem.",
            },
            {
                question: "What if a seller doesn't show up for the meetup?",
                answer:
                    "If a seller doesn't show up, contact them via chat or call to reschedule. If they're unresponsive, you can report the user on Yavuli. We take reliability seriously and repeated no-shows can result in account actions. Always confirm meetups a few hours in advance.",
            },
        ],
    },
    {
        id: "payments",
        icon: <CreditCard className="h-5 w-5" />,
        title: "Payments",
        color: "from-amber-500 to-orange-600",
        questions: [
            {
                question: "How do I pay for an item?",
                answer:
                    "For campus meetups, cash payment at the time of handoff is the most common and recommended method — simple and instant. For online or remote transactions, payment options can be discussed between buyer and seller (UPI, bank transfer, etc.). Yavuli is rolling out integrated payment support soon.",
            },
            {
                question: "Does Yavuli charge any fees?",
                answer:
                    "Listing items on Yavuli is completely free. We don't take a cut from campus meetup transactions. For inter-campus deliveries, since users currently arrange their own shipping, standard third-party charges apply based on your chosen courier. We're committed to keeping Yavuli as cost-free for students as possible.",
            },
            {
                question: "What payment methods are accepted?",
                answer:
                    "For in-person meetups, cash is king. For remote or inter-campus deals, you can agree on any method with the other party — UPI (Google Pay, PhonePe, Paytm), bank transfer, etc. Always get confirmation (screenshot or acknowledgment) of payment before handing over the item.",
            },
        ],
    },
    {
        id: "listings",
        icon: <Search className="h-5 w-5" />,
        title: "Listings & Buying",
        color: "from-rose-500 to-pink-600",
        questions: [
            {
                question: "How do I list an item for sale?",
                answer:
                    "Click 'Sell' in the navigation bar, fill in the item details (title, description, price, condition, photos), and publish. Your listing goes live instantly and is visible to students across all partnered campuses. Make sure to be honest and detailed — great listings sell faster.",
            },
            {
                question: "Can I sell services, not just items?",
                answer:
                    "Yes! Yavuli supports listing services too — tutoring, design work, coding help, notes, and more. Just list it like an item with a clear description of what you offer, your availability, and pricing.",
            },
            {
                question: "How do I find items near my campus?",
                answer:
                    "Use the Explore page and filter by campus! You can search by keyword, category, or browse all listings. Items from your own campus will be the easiest to meet up for, but you can also view inter-campus listings if you're open to shipping or travel.",
            },
            {
                question: "Can I negotiate the price?",
                answer:
                    "Absolutely — Yavuli is a peer-to-peer marketplace. Message the seller directly and make an offer. Most sellers are open to reasonable negotiations, especially for older items or bulk buys. Be polite and prompt when negotiating.",
            },
            {
                question: "How long do listings stay active?",
                answer:
                    "Your listing stays active until you manually mark it as sold or delete it. We recommend updating or removing listings once the item is no longer available to avoid wasting other students' time.",
            },
        ],
    },
    {
        id: "account",
        icon: <User className="h-5 w-5" />,
        title: "Account & Profile",
        color: "from-indigo-500 to-violet-600",
        questions: [
            {
                question: "How do I create an account?",
                answer:
                    "Click 'Sign Up' and register with your college email. Complete your profile with your campus, course, and a profile photo to build trust with other users. A complete profile makes buyers and sellers more comfortable transacting with you.",
            },
            {
                question: "Can I use Yavuli without signing up?",
                answer:
                    "You can browse listings without an account, but to contact sellers, save items, or list your own items for sale, you'll need to create a free account. Sign-up takes less than a minute!",
            },
            {
                question: "How do I report a user or listing?",
                answer:
                    "On any listing or user profile, look for the report option. Provide details of the issue — fraudulent listing, fake item description, no-show, or inappropriate behavior. Our team reviews reports and takes appropriate action to keep the community safe.",
            },
        ],
    },
];

function FAQItem({ question, answer }: FAQItem) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 ${open ? "shadow-md" : "hover:shadow-sm"
                }`}
        >
            <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <span className={`text-sm font-semibold leading-snug transition-colors ${open ? "text-primary" : "text-slate-800 group-hover:text-primary"}`}>
                    {question}
                </span>
                <span className={`shrink-0 rounded-full p-1 transition-colors ${open ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"}`}>
                    {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
            </button>
            {open && (
                <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function FAQ() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const displayedCategories = activeCategory
        ? faqCategories.filter((c) => c.id === activeCategory)
        : faqCategories;

    return (
        <>
            <Helmet>
                <title>FAQ | Yavuli — Student Marketplace</title>
                <meta
                    name="description"
                    content="Frequently asked questions about Yavuli — delivery, meetups, payments, safety, and more. Everything you need to know about buying and selling on the student marketplace."
                />
            </Helmet>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
                {/* Hero */}
                <section className="relative overflow-hidden pt-20 pb-16 px-6">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />
                    </div>
                    <div className="max-w-3xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white border border-violet-100 rounded-full px-4 py-1.5 text-xs font-semibold text-violet-600 tracking-widest uppercase mb-6 shadow-sm">
                            <HelpCircle className="h-3.5 w-3.5" />
                            Help Center
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                            Frequently Asked{" "}
                            <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                                Questions
                            </span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                            Everything you need to know about buying, selling, delivery, and
                            meetups on Yavuli — the student marketplace built for you.
                        </p>
                    </div>
                </section>

                {/* Category Filter */}
                <section className="px-6 pb-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all ${activeCategory === null
                                    ? "bg-violet-600 text-white shadow-lg shadow-violet-200 border-2 border-violet-600"
                                    : "bg-white border-2 border-slate-300 text-slate-700 hover:border-violet-400 hover:text-violet-600"
                                    }`}
                            >
                                All Topics
                            </button>
                            {faqCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() =>
                                        setActiveCategory(activeCategory === cat.id ? null : cat.id)
                                    }
                                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all flex items-center gap-1.5 ${activeCategory === cat.id
                                        ? "bg-violet-600 text-white shadow-lg shadow-violet-200 border-2 border-violet-600"
                                        : "bg-white border-2 border-slate-300 text-slate-700 hover:border-violet-400 hover:text-violet-600"
                                        }`}
                                >
                                    {cat.icon}
                                    {cat.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Sections */}
                <section className="px-6 pb-24">
                    <div className="max-w-3xl mx-auto space-y-12">
                        {displayedCategories.map((cat) => (
                            <div key={cat.id}>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className={`p-2 rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-sm`}>
                                        {cat.icon}
                                    </div>
                                    <h2 className="text-lg font-black text-slate-900 tracking-tight">
                                        {cat.title}
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {cat.questions.map((item, i) => (
                                        <FAQItem key={i} question={item.question} answer={item.answer} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Still have questions CTA */}
                <section className="px-6 pb-24">
                    <div className="max-w-2xl mx-auto bg-gradient-to-br from-violet-600 to-sky-500 rounded-3xl p-10 text-center text-white shadow-xl">
                        <div className="text-3xl mb-3">💬</div>
                        <h2 className="text-2xl font-black mb-2">Still have questions?</h2>
                        <p className="text-white/80 text-sm font-medium mb-6 max-w-md mx-auto">
                            Can't find what you're looking for? Reach out to us directly or
                            join our community Discord — we're always happy to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="mailto:founder@yavuli.app"
                                className="inline-flex items-center justify-center gap-2 bg-white text-violet-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors shadow"
                            >
                                Email Us
                            </a>
                            <a
                                href="https://discord.gg/2Y5tPhMPqn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-white/25 transition-colors"
                            >
                                Join Discord
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
