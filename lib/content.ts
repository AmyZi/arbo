import {
  Sparkles,
  ShieldCheck,
  Gauge,
  Workflow,
  Boxes,
  GitBranch,
  LineChart,
  Cpu,
  Brain,
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
];

export type ProblemSolution = {
  pain: string;
  solution: string;
  icon: LucideIcon;
};

export const problemSolutions: ProblemSolution[] = [
  {
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
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: '12k+', label: 'Teams shipping GenAI' },
  { value: '480M', label: 'Inferences per month' },
  { value: '99.98%', label: 'Runtime uptime' },
  { value: '40%', label: 'Avg cost reduction' },
];

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: 'Features', href: '/#features' },
  { label: 'Workflow', href: '/#workflow' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/#pricing' },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
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
  },
];

export const footerSections: { title: string; links: NavItem[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Workflow', href: '/#workflow' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Changelog', href: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Docs', href: '/#features' },
      { label: 'Guides', href: '/#features' },
      { label: 'API Reference', href: '/#features' },
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
] as const;
