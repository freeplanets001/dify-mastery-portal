import { Button } from '@/components/ui/button.jsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion.jsx'
import {
  Code2,
  Rocket,
  GraduationCap,
  Users,
  Sparkles,
  Layers,
  PenTool,
  BarChart3,
  Shield,
  Lightbulb,
  Terminal,
  BookOpen,
  Cpu,
  Globe
} from 'lucide-react'
import './App.css'

const featureHighlights = [
  {
    title: '構造化されたロードマップ',
    description: '基礎文法から実務レベルのプロジェクトまで、12週間で段階的に実力を引き上げるロードマップを用意。',
    icon: Code2
  },
  {
    title: '現場で通用する課題',
    description: 'AIアシスタントと組み合わせたコードレビューやリファクタリングなど、実際の現場と同じ流れで学習。',
    icon: Rocket
  },
  {
    title: '学習サポート体制',
    description: 'ライブ講義・録画・質問フォーラムを組み合わせ、挫折させないサポート体制を構築しています。',
    icon: Users
  }
]

const learningTracks = [
  {
    title: 'Beginner Launchpad',
    subtitle: '未経験からPythonの基礎を確実に習得',
    icon: GraduationCap,
    duration: '4週間',
    focus: ['文法・データ型', '制御構文', '標準ライブラリ', 'Gitの基本'],
    outcome: '日常業務を自動化するスクリプトが自力で作れる'
  },
  {
    title: 'Career Accelerator',
    subtitle: 'チーム開発で通用する実務力を獲得',
    icon: Layers,
    duration: '5週間',
    focus: ['テスト駆動開発', 'API / Webアプリ', 'Docker基礎', 'CI/CD入門'],
    outcome: 'チーム開発で品質とスピードを両立できるエンジニアへ'
  },
  {
    title: 'Data Science Focus',
    subtitle: 'データ分析・機械学習の第一歩を踏み出す',
    icon: BarChart3,
    duration: '3週間',
    focus: ['Pandas & NumPy', '可視化', '機械学習基礎', 'モデル評価'],
    outcome: 'データに基づく意思決定ができるスキルセットを獲得'
  }
]

const curriculumModules = [
  {
    name: 'Python Foundations',
    focus: 'コンピュータサイエンスの基礎思考を身につける',
    topics: ['データ型とコレクション', '関数設計とドキュメント', '例外処理とデバッグ', 'テスト自動化の基礎'],
    outcomes: ['PEP8準拠のコード記述', 'pytestによる自動テスト', '堅牢なエラーハンドリング'],
    icon: BookOpen
  },
  {
    name: 'Applied Automation',
    focus: '業務効率化を支える自動化スクリプトを構築',
    topics: ['ファイル操作と自動レポート', 'Webスクレイピング', 'API連携', 'スケジューリング'],
    outcomes: ['日次レポートの自動生成', '外部API連携の設計', '再利用可能なモジュール化'],
    icon: Terminal
  },
  {
    name: 'Web & API Development',
    focus: 'ユーザーに価値を届けるアプリケーション開発',
    topics: ['FastAPIによるAPI設計', 'テンプレートと認証', 'データベースモデリング', 'クラウドデプロイ'],
    outcomes: ['スケーラブルなAPI開発', 'Dockerでの本番運用', '自動デプロイの仕組み構築'],
    icon: Globe
  },
  {
    name: 'Data & Machine Learning',
    focus: 'ビジネス価値を生むデータ活用を実践',
    topics: ['データクレンジング', 'EDAと可視化', 'モデル構築', '成果プレゼンテーション'],
    outcomes: ['Jupyterによる分析レポート', 'scikit-learnでの予測モデル', '意思決定に繋がる提案資料'],
    icon: Cpu
  }
]

const projectShowcase = [
  {
    title: '自動レポート生成システム',
    level: 'Week 3',
    description: '社内のExcelレポート作成を完全自動化。テンプレート管理と通知まで一括で処理。',
    stack: ['Pandas', 'OpenPyXL', 'APScheduler']
  },
  {
    title: 'FastAPIベースの顧客管理API',
    level: 'Week 6',
    description: 'JWT認証とロール管理を備えたスケーラブルなAPIをチーム開発形式で構築。',
    stack: ['FastAPI', 'PostgreSQL', 'Docker']
  },
  {
    title: '需要予測ダッシュボード',
    level: 'Week 10',
    description: '機械学習モデルで需要予測を行い、意思決定者向けのダッシュボードを提案。',
    stack: ['scikit-learn', 'Plotly', 'Streamlit']
  }
]

const testimonials = [
  {
    name: 'Ayaka Sato',
    role: 'データアナリスト / IT企業',
    result: '1.5倍の分析スピードを実現',
    quote:
      '学習ロードマップが明確で、手を動かしながら理解が深まりました。現場のレビューに近いフィードバックで着実に力がつきました。'
  },
  {
    name: 'Kohei Tanaka',
    role: 'バックエンドエンジニア / フリーランス',
    result: 'FastAPI案件を継続受注',
    quote:
      '開発プロセスが体系的に学べたことで、提案からデリバリーまで自信を持って進められるようになりました。コミュニティでの情報交換も大きな財産です。'
  },
  {
    name: 'Mika Suzuki',
    role: '企画職からキャリアチェンジ',
    result: '未経験から内定獲得',
    quote:
      'アウトプット主体のカリキュラムで思考法が身につきました。メンターの伴走で面接対策も安心して進められました。'
  }
]

const pricingPlans = [
  {
    title: 'Essential',
    price: '¥69,800',
    period: '一括 / 12週間アクセス',
    description: 'まずは自分のペースでスキルを固めたい方向け。',
    features: ['ライブ講義アーカイブ', '週次課題レビュー', '学習ダッシュボード', 'オンラインコミュニティ']
  },
  {
    title: 'Professional',
    price: '¥98,800',
    period: '一括 / 12週間アクセス',
    description: '実務案件を想定した演習とメンタリングを重視。',
    features: ['Essentialの全て', '個別コードレビュー', 'キャリア相談（月2回）', 'モック面接＆履歴書レビュー'],
    highlighted: true
  },
  {
    title: 'Team Plan',
    price: '¥248,000〜',
    period: '最大5名 / 12週間',
    description: '社内チームのPython導入を推進する企業様向け。',
    features: ['キックオフワークショップ', 'チーム専用ダッシュボード', '社内課題に合わせた教材カスタマイズ', '成果発表会の運営サポート']
  }
]

const faqs = [
  {
    question: 'プログラミング未経験でも参加できますか？',
    answer:
      'はい。初週で開発環境構築からプログラミングの基本思考を丁寧に解説します。キーボード操作やエディタの使い方までカバーするスターターガイドも用意しています。'
  },
  {
    question: '働きながらでも完走できるペースですか？',
    answer:
      '週6〜8時間の学習時間を想定したカリキュラムです。毎週の必須課題とオプション課題を分けているため、繁忙期でも調整しやすい構成になっています。'
  },
  {
    question: '講義はライブ配信ですか？',
    answer:
      '主要テーマはライブ配信を行い、録画と資料を即日公開します。ライブ参加が難しい場合でも、質問フォーラムでメンターに24時間以内に回答をもらえます。'
  },
  {
    question: '受講後のサポートはありますか？',
    answer:
      '卒業生コミュニティに無期限で参加可能です。キャリア相談や技術レビューのイベントを継続開催しており、最新トレンドのキャッチアップも可能です。'
  }
]

const toolchain = [
  { label: 'GitHub', description: 'チーム開発とコードレビューの基礎運用' },
  { label: 'VS Code', description: '開発効率を高める拡張機能と設定' },
  { label: 'Notion', description: '学習ログと知識ベースの管理' },
  { label: 'Dify & GPT', description: 'AIアシスタントを活用した学習・開発支援' }
]

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl space-y-4">
      {eyebrow && (
        <Badge variant="secondary" className="bg-sky-400/10 text-sky-300 border-sky-400/40">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      {description && (
        <p className="text-slate-300 leading-relaxed">{description}</p>
      )}
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_60%)]"
        aria-hidden
      />

      <header className="border-b border-white/5 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-300">
              <Code2 className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Python Mastery</p>
              <p className="text-lg font-semibold text-white">Dify Mastery Portal</p>
            </div>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              カリキュラム
            </Button>
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              サービス
            </Button>
            <Button className="bg-sky-500 text-slate-950 hover:bg-sky-400">
              無料相談を予約
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 space-y-24 md:space-y-32">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-10 md:p-16">
          <div className="absolute inset-y-0 right-0 w-full max-w-xl translate-x-1/4 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-12 md:flex-row md:items-center">
            <div className="space-y-6 md:w-3/5">
              <Badge className="bg-sky-500 text-slate-950 hover:bg-sky-400">AI時代に最短で活躍するPythonエンジニアへ</Badge>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                実務さながらのアウトプットで学ぶ<br />Python学習プラットフォーム
              </h1>
              <p className="text-lg leading-relaxed text-slate-300">
                Dify Mastery Portalは、AIアシスタントと連動した12週間の集中プログラム。コードを書くことはもちろん、
                課題定義・実装・レビュー・改善までを通しで学び、チームで価値を届けるエンジニアを育成します。
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-sky-500 text-slate-950 hover:bg-sky-400">
                  無料オリエンテーションに参加
                </Button>
                <Button size="lg" variant="outline" className="border-slate-700 bg-slate-900/60 text-white hover:bg-slate-800">
                  カリキュラムを見る
                </Button>
              </div>
              <div className="grid gap-6 pt-4 sm:grid-cols-3">
                {featureHighlights.map(feature => (
                  <div key={feature.title} className="flex gap-3 text-sm text-slate-300">
                    <div className="flex size-9 items-center justify-center rounded-lg border border-sky-400/40 bg-sky-500/10 text-sky-300">
                      <feature.icon className="size-4" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{feature.title}</p>
                      <p className="leading-relaxed text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Card className="relative flex-1 border-slate-800/80 bg-slate-950/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Sparkles className="size-5 text-sky-300" />
                  今週のライブセッション
                </CardTitle>
                <CardDescription className="text-slate-300">
                  実務直結のテーマでハンズオン。録画と資料はすべてアーカイブされます。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">非同期処理で高速化するWeb API</p>
                    <Badge className="bg-emerald-500/20 text-emerald-300">Hands-on</Badge>
                  </div>
                  <p className="text-slate-400">FastAPIのバックグラウンドタスクとRedisを活用したスケール戦略を学びます。</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">データ分析から意思決定への落とし込み</p>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                      Strategy
                    </Badge>
                  </div>
                  <p className="text-slate-400">定量分析の結果を経営層に伝えるストーリーづくりと可視化のベストプラクティス。</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">AIアシスタントと進めるコードレビュー</p>
                    <Badge variant="secondary" className="bg-sky-500/20 text-sky-200 border-sky-400/30">
                      Workshop
                    </Badge>
                  </div>
                  <p className="text-slate-400">生成AIを活用してレビュー品質を高めるプロンプト設計とチーム運用を体験。</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="tracks" className="space-y-12">
          <SectionHeader
            eyebrow="Learning Tracks"
            title="目的に合わせて選べる3つの学習トラック"
            description="習熟度とキャリアゴールに応じてカリキュラムを最適化。いずれのトラックでもAIアシスタントとの協働方法を徹底的に学びます。"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {learningTracks.map(track => (
              <Card key={track.title} className="flex flex-col border-slate-800/80 bg-slate-950/60">
                <CardHeader className="space-y-3">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-sky-400/40 bg-sky-500/10 text-sky-300">
                    <track.icon className="size-6" />
                  </div>
                  <CardTitle className="text-white">{track.title}</CardTitle>
                  <CardDescription className="text-slate-300">{track.subtitle}</CardDescription>
                  <Badge variant="secondary" className="w-fit bg-slate-800 text-slate-200">
                    {track.duration}
                  </Badge>
                </CardHeader>
                <CardContent className="mt-auto space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">学習テーマ</p>
                    <div className="flex flex-wrap gap-2">
                      {track.focus.map(item => (
                        <Badge key={item} variant="outline" className="border-slate-700 bg-slate-900/60 text-slate-200">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">到達目標</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{track.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="curriculum" className="space-y-12">
          <SectionHeader
            eyebrow="Curriculum"
            title="12週間で実務スキルを定着させるカリキュラム"
            description="各モジュールは1週間単位で構成。理解度チェックとコードレビューを繰り返し、インプットとアウトプットのバランスを最適化します。"
          />
          <div className="grid gap-8 md:grid-cols-2">
            {curriculumModules.map(module => (
              <Card key={module.name} className="border-slate-800/80 bg-slate-950/60">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-xl border border-sky-400/40 bg-sky-500/10 text-sky-300">
                      <module.icon className="size-6" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{module.name}</CardTitle>
                      <CardDescription className="text-slate-300">{module.focus}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">主なトピック</p>
                    <ul className="mt-3 space-y-2 text-slate-300">
                      {module.topics.map(topic => (
                        <li key={topic} className="flex items-start gap-2">
                          <div className="mt-1 size-1.5 rounded-full bg-sky-400" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">得られるスキル</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {module.outcomes.map(outcome => (
                        <div key={outcome} className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-slate-200">
                          {outcome}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-12">
          <SectionHeader
            eyebrow="Projects"
            title="段階ごとに挑戦するアウトプット課題"
            description="各プロジェクトは、要件定義・設計・実装・レビュー・改善のサイクルを回すことで、現場で求められる思考とスピードを鍛えます。"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {projectShowcase.map(project => (
              <Card key={project.title} className="border-slate-800/80 bg-slate-950/60">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-200">
                      {project.level}
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-300">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">使用スタック</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(item => (
                      <Badge key={item} variant="outline" className="border-slate-700 bg-slate-900/60 text-slate-200">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="toolchain" className="space-y-12">
          <SectionHeader
            eyebrow="Tools & Workflow"
            title="実務と同じ開発環境・ワークフローで学ぶ"
            description="現場で求められるリテラシーをそのまま身につけるため、ツールの設定や運用ガイドも丁寧に解説します。"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-slate-800/80 bg-slate-950/60">
              <CardHeader>
                <CardTitle className="text-white">チーム開発を支えるコミュニケーション</CardTitle>
                <CardDescription className="text-slate-300">
                  Difyのワークスペース上でAIアシスタントと会話しながら課題を整理。レビュー依頼・進捗共有まで一貫して行えます。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-1 size-4 text-sky-300" />
                  <p>課題の分解と優先順位付けをAIと共に行い、作業設計の思考法を身につけます。</p>
                </div>
                <div className="flex items-start gap-3">
                  <PenTool className="mt-1 size-4 text-sky-300" />
                  <p>コードレビューでは、指摘の背景を言語化するトレーニングを実施。チーム開発のコミュニケーション力を強化します。</p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="mt-1 size-4 text-sky-300" />
                  <p>セキュリティと品質チェックの観点から、自動テストと静的解析の導入もサポート。</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-800/80 bg-slate-950/60">
              <CardHeader>
                <CardTitle className="text-white">使用ツールとセットアップガイド</CardTitle>
                <CardDescription className="text-slate-300">
                  受講開始時に、ツールの設定テンプレートとおすすめ拡張機能をまとめたガイドを提供します。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                {toolchain.map(tool => (
                  <div key={tool.label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                    <p className="font-semibold text-white">{tool.label}</p>
                    <p className="mt-1 text-slate-300">{tool.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="testimonials" className="space-y-12">
          <SectionHeader
            eyebrow="Voices"
            title="受講生の成長ストーリー"
            description="受講前の課題から成果、今後のキャリアプランまで、学習の変化をリアルな声でご紹介します。"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map(testimonial => (
              <Card key={testimonial.name} className="border-slate-800/80 bg-slate-950/60">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-white">{testimonial.name}</CardTitle>
                  <CardDescription className="text-slate-400">{testimonial.role}</CardDescription>
                  <Badge className="w-fit bg-emerald-500/20 text-emerald-200">{testimonial.result}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-300">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing" className="space-y-12">
          <SectionHeader
            eyebrow="Pricing"
            title="学習スタイルに合わせて選べる料金プラン"
            description="いずれのプランでも、学習ダッシュボード・コミュニティ・ライブ講義の録画アーカイブは標準でご利用いただけます。"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {pricingPlans.map(plan => (
              <Card
                key={plan.title}
                className={`flex flex-col border-slate-800/80 bg-slate-950/60 ${
                  plan.highlighted ? 'ring-2 ring-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.15)]' : ''
                }`}
              >
                <CardHeader className="space-y-3">
                  <Badge
                    className={`${
                      plan.highlighted
                        ? 'bg-sky-500 text-slate-950 hover:bg-sky-400'
                        : 'bg-slate-800 text-slate-200'
                    } w-fit`}
                  >
                    {plan.title}
                  </Badge>
                  <div>
                    <CardTitle className="text-white">{plan.price}</CardTitle>
                    <CardDescription className="text-slate-300">{plan.period}</CardDescription>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{plan.description}</p>
                </CardHeader>
                <CardContent className="mt-auto space-y-3 text-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">含まれるサービス</p>
                  <ul className="space-y-2 text-slate-200">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex items-start gap-2">
                        <div className="mt-1 size-1.5 rounded-full bg-sky-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button
                    className={`${plan.highlighted ? 'bg-sky-500 text-slate-950 hover:bg-sky-400' : 'bg-slate-800 text-white hover:bg-slate-700'} w-full`}
                  >
                    申し込む
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="space-y-12">
          <SectionHeader
            eyebrow="FAQ"
            title="よくあるご質問"
            description="受講前に多くいただく質問をまとめました。詳細は個別相談でお気軽にお尋ねください。"
          />
          <Card className="border-slate-800/80 bg-slate-950/60">
            <CardContent className="px-6 py-8">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map(faq => (
                  <AccordionItem key={faq.question} value={faq.question} className="border-slate-800">
                    <AccordionTrigger className="text-left text-base text-white">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section id="cta" className="space-y-8 rounded-3xl border border-sky-500/40 bg-gradient-to-br from-sky-500/20 via-slate-950 to-slate-950 p-12 text-center">
          <div className="mx-auto max-w-2xl space-y-4">
            <Badge className="bg-sky-500 text-slate-950 hover:bg-sky-400">Next Step</Badge>
            <h2 className="text-4xl font-semibold text-white">あなたの学習ゴールに合わせた最適なプランをご提案します</h2>
            <p className="text-lg leading-relaxed text-slate-100/80">
              事前カウンセリングでは、現状のスキル診断と学習計画のカスタマイズを行います。無料オリエンテーションの参加枠は毎週10名までです。
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200">
              無料カウンセリングを予約
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
              資料をダウンロード
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-white">Dify Mastery Portal - Python Edition</p>
            <p className="mt-2">© {new Date().getFullYear()} Manus AI. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#tracks" className="hover:text-white">
              カリキュラム
            </a>
            <a href="#projects" className="hover:text-white">
              プロジェクト
            </a>
            <a href="#pricing" className="hover:text-white">
              料金プラン
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
