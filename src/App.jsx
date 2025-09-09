import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BookOpen, Download, Users, Star, Lock, CheckCircle, ArrowRight, Zap, Target, Trophy, Settings, BarChart3, Shield, Database } from 'lucide-react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showTrialForm, setShowTrialForm] = useState(false)
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    purchaseCode: ''
  })
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [trialData, setTrialData] = useState({
    name: '',
    email: '',
    experience: ''
  })
  
  // 管理者機能の状態管理
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [communityEnabled, setCommunityEnabled] = useState(false)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [siteAnnouncement, setSiteAnnouncement] = useState('')
  
  // 管理者パネルのモーダル状態
  const [showUserList, setShowUserList] = useState(false)
  const [showCodeGenerator, setShowCodeGenerator] = useState(false)
  const [showContentManager, setShowContentManager] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')

  // 管理者認証チェック
  const checkAdminStatus = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const adminParam = urlParams.get('admin')
    const adminStorage = localStorage.getItem('isAdmin')
    const adminCode = currentUser?.purchaseCode === 'ADMIN2024MASTER'
    
    return adminParam === 'true' || adminStorage === 'true' || adminCode
  }

  // 初期化時に管理者状態をチェック
  useEffect(() => {
    const adminStatus = checkAdminStatus()
    setIsAdmin(adminStatus)
    if (adminStatus) {
      localStorage.setItem('isAdmin', 'true')
    }
    
    // 設定の読み込み
    const savedCommunityEnabled = localStorage.getItem('communityEnabled')
    const savedMaintenanceMode = localStorage.getItem('maintenanceMode')
    const savedAnnouncement = localStorage.getItem('siteAnnouncement')
    
    if (savedCommunityEnabled) setCommunityEnabled(JSON.parse(savedCommunityEnabled))
    if (savedMaintenanceMode) setMaintenanceMode(JSON.parse(savedMaintenanceMode))
    if (savedAnnouncement) setSiteAnnouncement(savedAnnouncement)
  }, [currentUser])

  // 設定の保存
  const saveAdminSettings = () => {
    localStorage.setItem('communityEnabled', JSON.stringify(communityEnabled))
    localStorage.setItem('maintenanceMode', JSON.stringify(maintenanceMode))
    localStorage.setItem('siteAnnouncement', siteAnnouncement)
  }

  // 設定変更時に自動保存
  useEffect(() => {
    saveAdminSettings()
  }, [communityEnabled, maintenanceMode, siteAnnouncement])

  // ローカルストレージから会員データを取得
  const getUsers = () => {
    const users = localStorage.getItem('dify_members')
    return users ? JSON.parse(users) : []
  }

  // トライアルユーザーデータを取得
  const getTrialUsers = () => {
    const trialUsers = localStorage.getItem('dify_trial_users')
    return trialUsers ? JSON.parse(trialUsers) : []
  }

  // 会員データを保存
  const saveUser = (userData) => {
    const users = getUsers()
    users.push(userData)
    localStorage.setItem('dify_members', JSON.stringify(users))
  }

  // トライアルユーザーを保存
  const saveTrialUser = (trialUserData) => {
    const trialUsers = getTrialUsers()
    trialUsers.push(trialUserData)
    localStorage.setItem('dify_trial_users', JSON.stringify(trialUsers))
  }

  // トライアル期間チェック
  const checkTrialAccess = (user) => {
    if (!user || user.type !== 'trial') return { allowed: false, reason: 'not_trial' }
    
    const now = new Date()
    const endDate = new Date(user.endDate)
    
    if (now > endDate) {
      return { allowed: false, reason: 'trial_expired' }
    }
    
    return { allowed: true, remainingDays: Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)) }
  }

  // トライアルコンテンツアクセス制御
  const canAccessTrialContent = (contentId) => {
    if (!currentUser || currentUser.type !== 'trial') return false
    
    const trialContent = ['dify_intro_guide', 'sample_chatbot_dsl']
    return trialContent.includes(contentId)
  }

  // ログイン処理
  const handleLogin = (e) => {
    e.preventDefault()
    const users = getUsers()
    const trialUsers = getTrialUsers()
    
    // 正規ユーザーをチェック
    let user = users.find(u => u.email === loginData.email && u.password === loginData.password)
    
    // トライアルユーザーをチェック
    if (!user) {
      user = trialUsers.find(u => u.email === loginData.email && u.password === loginData.password)
    }
    
    if (user) {
      // トライアルユーザーの場合、期限チェック
      if (user.type === 'trial') {
        const accessCheck = checkTrialAccess(user)
        if (!accessCheck.allowed) {
          if (accessCheck.reason === 'trial_expired') {
            alert('トライアル期間が終了しました。正規版をご購入ください。')
            return
          }
        }
      }
      
      setIsLoggedIn(true)
      setCurrentUser(user)
      setShowLoginForm(false)
      setLoginData({ email: '', password: '' })
      
      // 管理者チェック
      setTimeout(() => {
        const adminStatus = checkAdminStatus()
        setIsAdmin(adminStatus)
        if (adminStatus) {
          localStorage.setItem('isAdmin', 'true')
        }
      }, 100)
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
    
    if (registerData.purchaseCode !== 'DIFY2024MASTER' && registerData.purchaseCode !== 'ADMIN2024MASTER') {
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
      purchaseCode: registerData.purchaseCode,
      registeredAt: new Date().toISOString()
    }

    saveUser(newUser)
    setIsLoggedIn(true)
    setCurrentUser(newUser)
    setShowRegisterForm(false)
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '', purchaseCode: '' })
    
    // 管理者チェック
    setTimeout(() => {
      const adminStatus = checkAdminStatus()
      setIsAdmin(adminStatus)
      if (adminStatus) {
        localStorage.setItem('isAdmin', 'true')
      }
    }, 100)
  }

  // トライアル登録処理
  const handleTrialRegister = (e) => {
    e.preventDefault()
    
    // バリデーション
    if (!trialData.name || !trialData.email || !trialData.experience) {
      alert('すべての項目を入力してください。')
      return
    }

    const users = getUsers()
    const trialUsers = getTrialUsers()
    
    // 既存ユーザーチェック
    if (users.find(u => u.email === trialData.email) || trialUsers.find(u => u.email === trialData.email)) {
      alert('このメールアドレスは既に登録されています。')
      return
    }

    // トライアルユーザー作成
    const trialUser = {
      id: 'trial_' + Date.now(),
      type: 'trial',
      name: trialData.name,
      email: trialData.email,
      password: 'trial_' + Math.random().toString(36).substring(2, 8), // 自動生成パスワード
      experience: trialData.experience,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3日後
      registeredAt: new Date().toISOString(),
      downloadCount: 0,
      maxDownloads: 1
    }

    saveTrialUser(trialUser)
    setIsLoggedIn(true)
    setCurrentUser(trialUser)
    setShowTrialForm(false)
    setTrialData({ name: '', email: '', experience: '' })
    
    alert(`トライアル登録が完了しました！\n自動生成パスワード: ${trialUser.password}\n\n3日間、限定コンテンツをお楽しみください。`)
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

  // マニュアル表示機能
  const viewManual = (filename) => {
    const url = `/downloads/manuals/${filename}`
    window.open(url, '_blank')
  }

  // 管理者機能
  const generatePurchaseCode = () => {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    const newCode = `DIFY${timestamp}${random}`
    setGeneratedCode(newCode)
  }

  const exportUserData = () => {
    const users = getUsers()
    const dataStr = JSON.stringify(users, null, 2)
    const dataBlob = new Blob([dataStr], {type: 'application/json'})
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `user_data_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const deleteUser = (userId) => {
    if (confirm('このユーザーを削除してもよろしいですか？')) {
      const users = getUsers()
      const filteredUsers = users.filter(user => user.id !== userId)
      localStorage.setItem('dify_members', JSON.stringify(filteredUsers))
      alert('ユーザーを削除しました。')
    }
  }

  // トライアル専用コンテンツ
  const trialContent = {
    manuals: [
      {
        id: 'dify_intro_guide',
        title: "DIFY入門ガイド（体験版）",
        description: "DIFYの基本概念と簡単な使い方",
        category: "入門",
        pages: "約10ページ",
        level: "初心者",
        icon: <BookOpen className="w-6 h-6" />,
        color: "bg-green-500",
        filename: "dify_intro_trial.pdf",
        isTrial: true
      }
    ],
    dslFiles: [
      {
        id: 'sample_chatbot_dsl',
        title: "サンプルチャットボット",
        description: "基本的なチャットボットのDSLファイル",
        category: "サンプル",
        difficulty: "初級",
        icon: <Zap className="w-6 h-6" />,
        color: "bg-green-500",
        filename: "sample_chatbot.yml",
        isTrial: true
      }
    ]
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
      filename: "WriteGeniusPro.yml",
      manualFilename: "writegenius_pro_master_guide.pdf"
    },
    {
      name: "YouTube Script Pro", 
      description: "バズる動画台本とサムネイルを自動生成",
      features: ["企画立案", "構成作成", "台本執筆", "サムネイル生成"],
      filename: "Youtubemaker.yml",
      manualFilename: "youtube_script_pro_master_guide.pdf"
    },
    {
      name: "Image Master AI",
      description: "対話型で理想の画像を生成",
      features: ["対話型インターフェース", "複数AI対応", "プロンプト最適化", "修正機能"],
      filename: "imageGenerator.yml",
      manualFilename: "image_master_ai_master_guide.pdf"
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
              <Button 
                onClick={() => setShowTrialForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                <Star className="w-5 h-5 mr-2" />
                3日間無料トライアル
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

        {/* トライアル登録フォーム */}
        {showTrialForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-green-600" />
                  3日間無料トライアル
                </CardTitle>
                <CardDescription>
                  限定コンテンツを3日間無料でお試しいただけます
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrialRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">お名前</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={trialData.name}
                      onChange={(e) => setTrialData({...trialData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">メールアドレス</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={trialData.email}
                      onChange={(e) => setTrialData({...trialData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">DIFYの経験レベル</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={trialData.experience}
                      onChange={(e) => setTrialData({...trialData, experience: e.target.value})}
                    >
                      <option value="">選択してください</option>
                      <option value="beginner">初心者（DIFYを触ったことがない）</option>
                      <option value="basic">基本レベル（少し触ったことがある）</option>
                      <option value="intermediate">中級レベル（ある程度使える）</option>
                      <option value="advanced">上級レベル（かなり詳しい）</option>
                    </select>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md">
                    <h4 className="font-semibold text-green-800 mb-2">トライアル内容</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• DIFY入門ガイド（10ページ）</li>
                      <li>• サンプルチャットボットDSL</li>
                      <li>• 3日間の限定アクセス</li>
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                      無料トライアル開始
                    </button>
                    <button 
                      type="button" 
                      className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50"
                      onClick={() => setShowTrialForm(false)}
                    >
                      キャンセル
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
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
              {currentUser?.type === 'trial' && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Star className="w-3 h-3 mr-1" />
                    トライアル
                  </Badge>
                  <span className="text-sm text-gray-600">
                    残り{checkTrialAccess(currentUser).remainingDays}日
                  </span>
                </div>
              )}
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                認証済み
              </Badge>
              {currentUser?.purchaseCode === 'ADMIN2024MASTER' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  管理者
                </Button>
              )}
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

      {/* 管理者パネル */}
      {currentUser?.purchaseCode === 'ADMIN2024MASTER' && showAdminPanel && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-red-800 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  管理者ダッシュボード
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAdminPanel(false)}
                >
                  閉じる
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* システム統計 */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      システム統計
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>登録ユーザー:</span>
                        <span className="font-semibold">{getUsers().length}名</span>
                      </div>
                      <div className="flex justify-between">
                        <span>コミュニティ:</span>
                        <span className={`font-semibold ${communityEnabled ? 'text-green-600' : 'text-red-600'}`}>
                          {communityEnabled ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>メンテナンス:</span>
                        <span className={`font-semibold ${maintenanceMode ? 'text-red-600' : 'text-green-600'}`}>
                          {maintenanceMode ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* コンテンツ管理 */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      コンテンツ管理
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={communityEnabled}
                          onChange={(e) => setCommunityEnabled(e.target.checked)}
                          className="rounded"
                        />
                        <span>コミュニティタブ表示</span>
                      </label>
                      <Button size="sm" className="w-full text-xs" onClick={() => setShowContentManager(true)}>
                        コンテンツ追加
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* ユーザー管理 */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      ユーザー管理
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-600">
                        最新登録: {getUsers().length > 0 ? getUsers()[getUsers().length - 1]?.name || '未登録' : '未登録'}
                      </div>
                      <Button size="sm" className="w-full text-xs" onClick={() => setShowUserList(true)}>
                        ユーザー一覧
                      </Button>
                      <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => setShowCodeGenerator(true)}>
                        コード生成
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* システム設定 */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      システム設定
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={maintenanceMode}
                          onChange={(e) => setMaintenanceMode(e.target.checked)}
                          className="rounded"
                        />
                        <span>メンテナンスモード</span>
                      </label>
                      <Button size="sm" variant="outline" className="w-full text-xs" onClick={exportUserData}>
                        データバックアップ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* お知らせ設定 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">サイトお知らせ設定</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <textarea
                      placeholder="サイト上部に表示するお知らせを入力してください..."
                      value={siteAnnouncement}
                      onChange={(e) => setSiteAnnouncement(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      rows="2"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={saveAdminSettings}>
                        設定保存
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setSiteAnnouncement('')}>
                        クリア
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* ユーザー一覧モーダル */}
      {showUserList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">ユーザー一覧</h3>
              <Button variant="outline" onClick={() => setShowUserList(false)}>閉じる</Button>
            </div>
            <div className="space-y-4">
              {getUsers().map((user, index) => (
                <div key={user.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">名前:</span>
                      <div className="font-semibold">{user.name}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">メール:</span>
                      <div className="font-semibold">{user.email}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">登録日:</span>
                      <div className="font-semibold">{new Date(user.registeredAt).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">購入者コード:</span>
                      <div className="font-semibold">{user.purchaseCode || 'DIFY2024MASTER'}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => deleteUser(user.id)}>
                      削除
                    </Button>
                  </div>
                </div>
              ))}
              {getUsers().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  登録ユーザーがいません
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* コード生成モーダル */}
      {showCodeGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">購入者コード生成</h3>
              <Button variant="outline" onClick={() => setShowCodeGenerator(false)}>閉じる</Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">新しい購入者コード</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={generatedCode}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    placeholder="コードを生成してください"
                  />
                  <Button onClick={() => navigator.clipboard.writeText(generatedCode)} disabled={!generatedCode}>
                    コピー
                  </Button>
                </div>
              </div>
              <Button onClick={generatePurchaseCode} className="w-full">
                新しいコードを生成
              </Button>
              <div className="text-sm text-gray-600">
                生成されたコードは新規ユーザーの登録に使用できます。
              </div>
            </div>
          </div>
        </div>
      )}

      {/* コンテンツ管理モーダル */}
      {showContentManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">コンテンツ管理</h3>
              <Button variant="outline" onClick={() => setShowContentManager(false)}>閉じる</Button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">現在のコンテンツ</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>PDFマニュアル</span>
                    <span className="text-green-600">5ファイル</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>DSLファイル</span>
                    <span className="text-green-600">3ファイル</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>コミュニティ機能</span>
                    <span className={communityEnabled ? 'text-green-600' : 'text-red-600'}>
                      {communityEnabled ? '有効' : '無効'}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">将来の機能</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• 新しいPDFマニュアルのアップロード</div>
                  <div>• DSLファイルの追加・更新</div>
                  <div>• コンテンツのバージョン管理</div>
                  <div>• ユーザー別アクセス制御</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* サイトお知らせ */}
      {siteAnnouncement && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">{siteAnnouncement}</span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="manuals" className="w-full">
          <TabsList className={`grid w-full ${communityEnabled ? 'grid-cols-3' : 'grid-cols-2'}`}>
            <TabsTrigger value="manuals">マニュアル一覧</TabsTrigger>
            <TabsTrigger value="apps">DSLファイル</TabsTrigger>
            {communityEnabled && <TabsTrigger value="community">コミュニティ</TabsTrigger>}
          </TabsList>

          <TabsContent value="manuals" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">マニュアル一覧</h2>
              <p className="text-gray-600">世界最強レベルのDIFYマニュアルコレクション</p>
            </div>

            {/* トライアルユーザー向けコンテンツ */}
            {currentUser?.type === 'trial' && (
              <div className="mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    🎉 トライアル限定コンテンツ
                  </h3>
                  <p className="text-green-700 text-sm">
                    3日間の無料トライアル期間中にお楽しみいただけるコンテンツです。
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {trialContent.manuals.map((manual, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow border-green-200">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-12 h-12 ${manual.color} rounded-lg flex items-center justify-center text-white`}>
                            {manual.icon}
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {manual.category}
                          </Badge>
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
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => downloadFile(manual.filename, 'trial')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          PDFダウンロード
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    💎 正規版で利用可能なコンテンツ
                  </h3>
                  <p className="text-blue-700 text-sm mb-3">
                    正規版をご購入いただくと、以下の全コンテンツにアクセスできます。
                  </p>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open('https://coconala.com', '_blank')}
                  >
                    正規版を購入する
                  </Button>
                </div>
              </div>
            )}

            {/* 正規ユーザー向けコンテンツまたはトライアルユーザーのプレビュー */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {manuals.map((manual, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-lg transition-shadow ${
                    currentUser?.type === 'trial' ? 'opacity-60' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
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
                      disabled={currentUser?.type === 'trial'}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {currentUser?.type === 'trial' ? '正規版限定' : 'PDFダウンロード'}
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

            {/* トライアルユーザー向けDSLコンテンツ */}
            {currentUser?.type === 'trial' && (
              <div className="mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    🎉 トライアル限定DSLファイル
                  </h3>
                  <p className="text-green-700 text-sm">
                    3日間の無料トライアル期間中にお試しいただけるサンプルDSLファイルです。
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {trialContent.dslFiles.map((dsl, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow border-green-200">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-12 h-12 ${dsl.color} rounded-lg flex items-center justify-center text-white`}>
                            {dsl.icon}
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {dsl.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{dsl.title}</CardTitle>
                        <CardDescription>{dsl.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">難易度:</span>
                            <span className="font-medium">{dsl.difficulty}</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => downloadFile(dsl.filename, 'trial-dsl')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          DSLファイルダウンロード
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 正規ユーザー向けDSLコンテンツまたはトライアルユーザーのプレビュー */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dslApps.map((app, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-lg transition-shadow ${
                    currentUser?.type === 'trial' ? 'opacity-60' : ''
                  }`}
                >
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
                        disabled={currentUser?.type === 'trial'}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {currentUser?.type === 'trial' ? '正規版限定' : 'DSLファイルダウンロード'}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => viewManual(app.manualFilename)}
                        disabled={currentUser?.type === 'trial'}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        {currentUser?.type === 'trial' ? '正規版限定' : 'マニュアルを見る'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {communityEnabled && (
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

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      月次ウェビナー
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      毎月開催される限定ウェビナーで最新のDIFY活用法を学べます。
                    </p>
                    <Button className="w-full">
                      次回予定を確認
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      限定リソース
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      コミュニティメンバー限定のテンプレートやツールをダウンロードできます。
                    </p>
                    <Button className="w-full">
                      リソースを見る
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}

export default App

