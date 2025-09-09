import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BookOpen, Download, Users, Star, Lock, CheckCircle, ArrowRight, Zap, Target, Trophy } from 'lucide-react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    purchaseCode: ''
  })
  const [currentUser, setCurrentUser] = useState(null)

  // ローカルストレージから会員データを取得
  const getUsers = () => {
    const users = localStorage.getItem('dify_members')
    return users ? JSON.parse(users) : []
  }

  // 会員データを保存
  const saveUser = (userData) => {
    const users = getUsers()
    users.push(userData)
    localStorage.setItem('dify_members', JSON.stringify(users))
  }

  // ログイン処理
  const handleLogin = (e) => {
    e.preventDefault()
    const users = getUsers()
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password)
    
    if (user) {
      setIsLoggedIn(true)
      setCurrentUser(user)
      setShowLoginForm(false)
      setLoginData({ email: '', password: '' })
    } else {
      alert('メールアドレスまたはパスワードが正しくありません。')
    }
  }

  // 会員登録処理
  const handleRegister = (e) => {
    e.preventDefault()
    
    // バリデーション
    if (registerData.password !== registerData.confirmPassword) {
      alert('パスワードが一致しません。')
      return
    }
    
    if (registerData.purchaseCode !== 'DIFY2024MASTER') {
      alert('購入者コードが正しくありません。')
      return
    }

    const users = getUsers()
    if (users.find(u => u.email === registerData.email)) {
      alert('このメールアドレスは既に登録されています。')
      return
    }

    // 新規ユーザー登録
    const newUser = {
      id: Date.now(),
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      registeredAt: new Date().toISOString()
    }

    saveUser(newUser)
    setIsLoggedIn(true)
    setCurrentUser(newUser)
    setShowRegisterForm(false)
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '', purchaseCode: '' })
  }

  // ログアウト処理
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  // ダウンロード機能
  const downloadFile = (filename, folder) => {
    const link = document.createElement('a')
    link.href = `/downloads/${folder}/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const manuals = [
    {
      id: 1,
      title: "世界最強DIFY完全構築ガイド",
      description: "DIFYの基礎から応用まで完全網羅",
      category: "基礎",
      pages: "約25ページ",
      level: "初心者〜中級者",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-blue-500",
      filename: "dify_ultimate_guide.pdf"
    },
    {
      id: 2,
      title: "プロ級アプリ構築マスターマニュアル",
      description: "ワークフロー設計から実践的アプリ構築まで",
      category: "応用",
      pages: "約30ページ",
      level: "中級者〜上級者",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-purple-500",
      filename: "dify_app_build_master_manual.pdf"
    },
    {
      id: 3,
      title: "WriteGenius Pro 完全マスターガイド",
      description: "ブログ記事自動執筆アプリの完全攻略",
      category: "アプリ専用",
      pages: "約20ページ",
      level: "全レベル",
      icon: <Target className="w-6 h-6" />,
      color: "bg-green-500",
      filename: "writegenius_pro_master_guide.pdf"
    },
    {
      id: 4,
      title: "YouTube Script Pro 完全マスターガイド",
      description: "バズる動画台本作成の秘訣",
      category: "アプリ専用",
      pages: "約18ページ",
      level: "全レベル",
      icon: <Trophy className="w-6 h-6" />,
      color: "bg-red-500",
      filename: "youtube_script_pro_master_guide.pdf"
    },
    {
      id: 5,
      title: "Image Master AI 完全マスターガイド",
      description: "神絵師になるための対話術",
      category: "アプリ専用",
      pages: "約16ページ",
      level: "全レベル",
      icon: <Star className="w-6 h-6" />,
      color: "bg-yellow-500",
      filename: "image_master_ai_master_guide.pdf"
    }
  ]

  const dslApps = [
    {
      name: "WriteGenius Pro",
      description: "SEO最適化されたブログ記事を自動生成",
      features: ["Google検索連携", "SEO分析", "複数AI統合", "参考URL自動追記"],
      filename: "WriteGenius Pro.yml"
    },
    {
      name: "YouTube Script Pro", 
      description: "バズる動画台本とサムネイルを自動生成",
      features: ["企画立案", "構成作成", "台本執筆", "サムネイル生成"],
      filename: "Youtubemaker.yml"
    },
    {
      name: "Image Master AI",
      description: "対話型で理想の画像を生成",
      features: ["対話型インターフェース", "複数AI対応", "プロンプト最適化", "修正機能"],
      filename: "imageGenerator.yml"
    }
  ]

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          {/* ヘッダー */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6">
              <Lock className="w-4 h-4" />
              会員限定ポータル
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              DIFY Mastery Portal
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              世界最強レベルのDIFYマニュアル・コンプリートパッケージ
              <br />
              数十万・数百万の売上を目指せる完全版コンテンツ
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => {
                  console.log('Login button clicked');
                  setShowLoginForm(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              >
                ログイン
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => {
                  console.log('Register button clicked');
                  console.log('Current showRegisterForm state:', showRegisterForm);
                  setShowRegisterForm(true);
                  console.log('Setting showRegisterForm to true');
                }}
                variant="outline"
                className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white px-8 py-3 text-lg"
              >
                新規会員登録
              </Button>
            </div>
          </div>

          {/* 特徴 */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">8冊の完全マニュアル</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">約200ページの大ボリューム。初心者からプロまで全レベル対応。</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <Download className="w-12 h-12 text-green-400 mb-4" />
                <CardTitle className="text-white">実用DSLファイル</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">すぐに使える3つのDIFYアプリ。実証済みの高品質ワークフロー。</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <Users className="w-12 h-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">継続サポート</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">購入者限定コミュニティと個別コンサルティング。</p>
              </CardContent>
            </Card>
          </div>

          {/* 価格 */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/50 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-white">コンプリートパッケージ</CardTitle>
                <CardDescription className="text-gray-300">
                  全マニュアル + DSLファイル + 特典
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-4">¥49,800</div>
                <p className="text-gray-300 mb-6">一括購入・永久アクセス</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  今すぐ購入
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ログインモーダル */}
        {showLoginForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>ログイン</CardTitle>
                <CardDescription>会員専用エリアにアクセス</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">メールアドレス</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">パスワード</label>
                    <input
                      type="password"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">ログイン</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowLoginForm(false)}
                    >
                      キャンセル
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 会員登録モーダル */}
        {console.log('Rendering register form check:', showRegisterForm)}
        {showRegisterForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {console.log('Register form is being rendered')}
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">新規会員登録</h2>
              <p className="mb-4">購入者コードが必要です</p>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">お名前</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">メールアドレス</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">パスワード</label>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">パスワード確認</label>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">購入者コード</label>
                  <input
                    type="text"
                    required
                    placeholder="商品購入時に提供されたコード"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={registerData.purchaseCode}
                    onChange={(e) => setRegisterData({...registerData, purchaseCode: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">登録</button>
                  <button 
                    type="button" 
                    className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50"
                    onClick={() => setShowRegisterForm(false)}
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DIFY Mastery Portal</h1>
                <p className="text-sm text-gray-600">会員限定ポータル</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                認証済み
              </Badge>
              <Button 
                variant="outline" 
                onClick={handleLogout}
              >
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="manuals" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manuals">マニュアル一覧</TabsTrigger>
            <TabsTrigger value="apps">DSLファイル</TabsTrigger>
            <TabsTrigger value="community">コミュニティ</TabsTrigger>
          </TabsList>

          <TabsContent value="manuals" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">マニュアル一覧</h2>
              <p className="text-gray-600">世界最強レベルのDIFYマニュアルコレクション</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {manuals.map((manual) => (
                <Card key={manual.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 ${manual.color} rounded-lg flex items-center justify-center text-white`}>
                        {manual.icon}
                      </div>
                      <Badge variant="outline">{manual.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{manual.title}</CardTitle>
                    <CardDescription>{manual.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ページ数:</span>
                        <span className="font-medium">{manual.pages}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">対象レベル:</span>
                        <span className="font-medium">{manual.level}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => downloadFile(manual.filename, 'manuals')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PDFダウンロード
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="apps" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">DSLファイル</h2>
              <p className="text-gray-600">すぐに使える実用DIFYアプリ</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dslApps.map((app, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    <CardDescription>{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {app.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Button 
                        className="w-full"
                        onClick={() => downloadFile(app.filename, 'dsl-files')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        DSLファイルダウンロード
                      </Button>
                      <Button variant="outline" className="w-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        マニュアルを見る
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">コミュニティ</h2>
              <p className="text-gray-600">購入者限定の特別サポート</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    購入者限定コミュニティ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Slackワークスペースで他の購入者と情報交換、質問、共同開発が可能です。
                  </p>
                  <Button className="w-full">
                    Slackに参加
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    個別コンサルティング
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    30分の無料個別コンサルティングで、あなたの課題を直接解決します。
                  </p>
                  <Button className="w-full">
                    予約する
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

