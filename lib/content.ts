import {
  Sparkles,
  ShieldCheck,
  Gauge,
  GitBranch,
  Brain,
  Target,
  Rocket,
  RefreshCw,
  Megaphone,
  Users,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
};

export const features: Feature[] = [
  {
    icon: Target,
    title: 'Targeted Customer Acquisition',
    description:
      'Attract the right buyers, not just more traffic. We put your small business in front of people who are actively ready to buy.',
    accent: 'from-orange-500/20 to-red-500/10',
  },
  {
    icon: Rocket,
    title: 'High-Converting System',
    description:
      'Turn clicks into paying clients. Our proven funnel does the selling for you, converting visitors into customers around the clock.',
    accent: 'from-red-500/20 to-pink-500/10',
  },
  {
    icon: RefreshCw,
    title: 'Automation & Scale',
    description:
      'Grow revenue without working 80-hour weeks. We automate the busywork so your small business can scale past competitors.',
    accent: 'from-pink-500/20 to-rose-500/10',
  },
];

export type ProblemSolution = {
  pain: string;
  solution: string;
  icon: LucideIcon;
};

export const problemSolutions: ProblemSolution[] = [
  {
    pain: 'Your pipeline is empty and you\u2019re refreshing your inbox, hoping today\u2019s the day a new customer shows up.',
    solution:
      'A steady, automated flow of qualified leads finds you \u2014 so you can focus on running the business you built.',
    icon: Users,
  },
  {
    pain: 'One great month, two dry ones. Your revenue is a rollercoaster you never agreed to ride.',
    solution:
      'A predictable, repeatable growth engine that turns feast-or-famine into consistent, soaring revenue.',
    icon: TrendingUp,
  },
  {
    pain: 'Ten tools, zero strategy \u2014 you\u2019re guessing what actually drives sales for your small business.',
    solution:
      'One clear system built for small business owners. No tech headaches, no guesswork \u2014 just results.',
    icon: Gauge,
  },
];

export type Step = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const workflowSteps: Step[] = [
  {
    step: '01',
    title: 'Attract',
    description: 'We put your small business in front of ready-to-buy customers, right when they\u2019re searching.',
    icon: Megaphone,
  },
  {
    step: '02',
    title: 'Convert',
    description: 'A high-converting funnel turns visitors into leads, and leads into paying clients.',
    icon: Rocket,
  },
  {
    step: '03',
    title: 'Automate',
    description: 'Follow-ups, nurture sequences, and booking all run on autopilot \u2014 no manual chasing.',
    icon: RefreshCw,
  },
  {
    step: '04',
    title: 'Scale',
    description: 'Reinvest what works, cut what doesn\u2019t, and grow your small business past your competitors.',
    icon: TrendingUp,
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: '500+', label: 'Small businesses served' },
  { value: '3.2x', label: 'Avg. increase in leads' },
  { value: '30 days', label: 'Avg. time to first results' },
  { value: '4.9/5', label: 'Average client rating' },
];

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#workflow' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/#pricing' },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: 'How fast can I expect to get more small business customers?',
    answer:
      'Most small business owners see their first new leads within the first 1\u20132 weeks, with momentum building steadily over the first 30 days as the system learns what converts best for your market.',
  },
  {
    question: 'Do I need to already have a website or ad budget?',
    answer:
      'No. We can build the funnel from scratch and advise on a starting ad budget that fits your business. If you already have a website or campaigns running, we\u2019ll plug into what\u2019s working and fix what isn\u2019t.',
  },
  {
    question: 'Is this only for online businesses, or does it work for local shops too?',
    answer:
      'Both. The system is built to help local small businesses (like clinics, salons, and contractors) and digital small businesses (like coaches and e-commerce brands) attract and convert customers consistently.',
  },
  {
    question: 'How much of this is automated versus done by me?',
    answer:
      'Lead capture, follow-up, and nurturing run automatically once set up. You stay focused on serving customers \u2014 we handle the marketing machinery behind the scenes.',
  },
  {
    question: 'What if I\u2019m already spending money on ads that aren\u2019t converting?',
    answer:
      'That\u2019s one of the most common reasons small business owners come to us. We audit what\u2019s currently running, cut the waste, and redirect that budget into a system built to convert.',
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'We doubled our monthly small business leads in 30 days. For the first time, I\u2019m not chasing customers \u2014 they\u2019re finding us.',
    name: 'Jordan Ellis',
    role: 'Owner',
    company: 'Ellis Home Services',
  },
  {
    quote:
      'I went from feast-or-famine to fully booked. This system finally gave my small business the predictable growth I\u2019d been chasing for years.',
    name: 'Priya Nathan',
    role: 'Founder',
    company: 'Nathan & Co. Studio',
  },
];

export const footerSections: { title: string; links: NavItem[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'How It Works', href: '/#workflow' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Case Studies', href: '/#newsletter' },
      { label: 'Guides', href: '/blog' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#manifesto' },
      { label: 'Careers', href: '/#manifesto' },
      { label: 'Contact', href: '/#newsletter' },
      { label: 'Privacy', href: '/#newsletter' },
    ],
  },
];

export const siteConfig = {
  name: 'Growth101',
  tagline: 'Get More Small Business Customers, On Autopilot',
  description:
    'The small business growth system \u2014 targeted customer acquisition, a high-converting funnel, and automation built to help small business owners get more customers and scale revenue.',
  url: 'https://growth101.example.com',
  email: 'hello@growth101.example.com',
};

export const aiCapabilities = [
  { label: 'Lead targeting accuracy', value: 96 },
  { label: 'Funnel conversion rate', value: 88 },
  { label: 'Automation coverage', value: 94 },
  { label: 'Client retention', value: 92 },
] as const;

export const mockWorkflowNodes = [
  { id: 'input', label: 'New Lead', icon: Sparkles },
  { id: 'guard', label: 'Qualify', icon: ShieldCheck },
  { id: 'model', label: 'Nurture', icon: Brain },
  { id: 'eval', label: 'Convert', icon: Gauge },
  { id: 'output', label: 'Customer Won', icon: GitBranch },
] as const;
