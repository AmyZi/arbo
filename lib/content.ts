import {
  Sparkles,
  ShieldCheck,
  Gauge,
<<<<<<< HEAD
  Workflow,
  Boxes,
  GitBranch,
  LineChart,
  Cpu,
  Brain,
=======
  GitBranch,
  Brain,
  Target,
  Rocket,
  RefreshCw,
  Megaphone,
  Users,
  TrendingUp,
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
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
<<<<<<< HEAD
    icon: Workflow,
    title: 'Composable AI Workflows',
    description:
      'Chain prompts, tools, and models into repeatable pipelines. Branch, retry, and fallback without rewriting orchestration code.',
    accent: 'from-orange-500/20 to-red-500/10',
  },
  {
    icon: Gauge,
    title: 'Continuous Evaluation',
    description:
      'Score every output on quality, safety, and cost with automated evals. Catch regressions before they reach production.',
    accent: 'from-red-500/20 to-pink-500/10',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails & Safety',
    description:
      'Wrap every call in policy controls. PII redaction, jailbreak detection, and topic fencing run inline at inference time.',
    accent: 'from-pink-500/20 to-rose-500/10',
  },
  {
    icon: GitBranch,
    title: 'Versioned Prompts',
    description:
      'Treat prompts like code. Diff, review, and roll back changes with full git-style history and A/B deployment.',
    accent: 'from-amber-500/20 to-orange-500/10',
  },
  {
    icon: LineChart,
    title: 'Observability Built-In',
    description:
      'Trace every request end-to-end. Latency, token cost, and failure modes in one dashboard with span-level detail.',
    accent: 'from-orange-500/20 to-pink-500/10',
  },
  {
    icon: Boxes,
    title: 'Model Portability',
    description:
      'Swap providers with a single config change. One interface across OpenAI, Anthropic, open-source, and self-hosted models.',
    accent: 'from-rose-500/20 to-red-500/10',
  },
=======
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
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
];

export type ProblemSolution = {
  pain: string;
  solution: string;
  icon: LucideIcon;
};

export const problemSolutions: ProblemSolution[] = [
  {
<<<<<<< HEAD
    pain: 'Prompts break silently in production and nobody notices for days.',
    solution:
      'Automated evals run on every deploy and every model swap, alerting the team the moment quality dips.',
    icon: Gauge,
  },
  {
    pain: 'Costs spike overnight with no way to trace which feature is responsible.',
    solution:
      'Per-request token accounting and feature-level cost attribution, surfaced in real time on one dashboard.',
    icon: LineChart,
  },
  {
    pain: 'Shipping a new AI feature means weeks of custom plumbing for each model.',
    solution:
      'A unified runtime abstracts the provider. Ship across OpenAI, Anthropic, and open models without touching app code.',
    icon: Cpu,
  },
  {
    pain: 'Every team rebuilds its own guardrails from scratch, inconsistently.',
    solution:
      'Shared, versioned policy modules for PII, safety, and topic control — applied uniformly across every workflow.',
    icon: ShieldCheck,
  },
=======
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
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
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
<<<<<<< HEAD
    title: 'Define',
    description: 'Describe the task, pick a model, and set success criteria.',
    icon: Sparkles,
  },
  {
    step: '02',
    title: 'Compose',
    description: 'Chain prompts, tools, and guardrails into a workflow.',
    icon: Workflow,
  },
  {
    step: '03',
    title: 'Evaluate',
    description: 'Run automated evals across thousands of test cases.',
    icon: Gauge,
  },
  {
    step: '04',
    title: 'Ship',
    description: 'Deploy with confidence, observe, and iterate in production.',
    icon: GitBranch,
=======
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
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
<<<<<<< HEAD
  { value: '12k+', label: 'Teams shipping GenAI' },
  { value: '480M', label: 'Inferences per month' },
  { value: '99.98%', label: 'Runtime uptime' },
  { value: '40%', label: 'Avg cost reduction' },
=======
  { value: '500+', label: 'Small businesses served' },
  { value: '3.2x', label: 'Avg. increase in leads' },
  { value: '30 days', label: 'Avg. time to first results' },
  { value: '4.9/5', label: 'Average client rating' },
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
];

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: 'Features', href: '/#features' },
<<<<<<< HEAD
  { label: 'Workflow', href: '/#workflow' },
=======
  { label: 'How It Works', href: '/#workflow' },
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/#pricing' },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
<<<<<<< HEAD
    question: 'Which model providers does GenAI 101 support?',
    answer:
      'OpenAI, Anthropic, Google, Cohere, Mistral, and any OpenAI-compatible endpoint — including self-hosted open-source models. Switching is a single config change; no app code refactoring required.',
  },
  {
    question: 'How do automated evaluations work?',
    answer:
      'You define test cases and scoring rubrics (exact match, LLM-as-judge, embedding similarity, or custom code). Evals run on every prompt change and model swap, surfacing regressions before deploy.',
  },
  {
    question: 'Can I bring my own guardrails?',
    answer:
      'Yes. Guardrails are modular policies you can compose. Ship our built-in PII, safety, and topic-fencing modules, or write your own and version them alongside prompts.',
  },
  {
    question: 'Is there a self-hosted option?',
    answer:
      'Yes. The runtime deploys to your own VPC as a container, keeping all inference traffic and telemetry inside your network. Cloud and hybrid deployments are also supported.',
  },
  {
    question: 'How is pricing structured?',
    answer:
      'Usage-based, scaled to inference volume and seats. There is a generous free tier for development and evaluation. Production plans include SLAs, SSO, and dedicated support.',
=======
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
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
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
<<<<<<< HEAD
      'We replaced six months of bespoke model plumbing with GenAI 101 in a week. Evals alone caught three regressions before launch.',
    name: 'Maya Okafor',
    role: 'Staff ML Engineer',
    company: 'Northwind',
  },
  {
    quote:
      'Guardrails used to be every team reinventing the wheel. Now it is one versioned module, applied everywhere, reviewed once.',
    name: 'Dev Patel',
    role: 'Head of AI Platform',
    company: 'Loop Commerce',
  },
  {
    quote:
      'Cost attribution finally made sense. We saw exactly which feature burned tokens and cut our monthly bill by 38%.',
    name: 'Sara Lindqvist',
    role: 'Engineering Lead',
    company: 'Fjord Health',
=======
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
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
  },
];

export const footerSections: { title: string; links: NavItem[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
<<<<<<< HEAD
      { label: 'Workflow', href: '/#workflow' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Changelog', href: '/blog' },
=======
      { label: 'How It Works', href: '/#workflow' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Blog', href: '/blog' },
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
<<<<<<< HEAD
      { label: 'Docs', href: '/#features' },
      { label: 'Guides', href: '/#features' },
      { label: 'API Reference', href: '/#features' },
=======
      { label: 'Case Studies', href: '/#newsletter' },
      { label: 'Guides', href: '/blog' },
      { label: 'FAQ', href: '/#faq' },
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#manifesto' },
<<<<<<< HEAD
      { label: 'Careers', href: '/#manifesto' },
      { label: 'Contact', href: '/#newsletter' },
      { label: 'Privacy', href: '/#newsletter' },
=======
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
    ],
  },
];

export const siteConfig = {
<<<<<<< HEAD
  name: 'GenAI 101',
  tagline: 'Ship Generative AI Products That Actually Work',
  description:
    'The production playbook for generative AI — workflows, evaluation, guardrails, and the infrastructure teams use to ship GenAI features customers love.',
  url: 'https://genai-101.example.com',
  email: 'hello@genai101.example.com',
};

export const aiCapabilities = [
  { label: 'Prompt orchestration', value: 96 },
  { label: 'Eval coverage', value: 88 },
  { label: 'Guardrail enforcement', value: 94 },
  { label: 'Cost efficiency', value: 79 },
] as const;

export const mockWorkflowNodes = [
  { id: 'input', label: 'User Request', icon: Sparkles },
  { id: 'guard', label: 'Guardrails', icon: ShieldCheck },
  { id: 'model', label: 'LLM Call', icon: Brain },
  { id: 'eval', label: 'Eval Gate', icon: Gauge },
  { id: 'output', label: 'Response', icon: GitBranch },
=======
  name: 'Arbo',
  tagline: 'Get More Small Business Customers, On Autopilot',
  description:
    'The small business growth system \u2014 targeted customer acquisition, a high-converting funnel, and automation built to help small business owners get more customers and scale revenue.',
  url: 'https://www.arboweb.com',
  email: 'contact@arboweb.com',
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
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
] as const;
