'use client';

import { useState, useEffect } from 'react';

export default function WakatimeFooter() {
  const [wakatimeData, setWakatimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWakatimeData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://late-grass-5e61.3420808767.workers.dev');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setWakatimeData(data);
        setError(null);
      } catch (err) {
        console.error('获取 Wakatime 数据失败:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWakatimeData();

    // 每5分钟刷新一次数据
    const interval = setInterval(fetchWakatimeData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    if (!seconds) return '0分钟';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}小时${minutes > 0 ? ` ${minutes}分钟` : ''}`;
    }
    return `${minutes}分钟`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <footer className="bg-gradient-to-r from-orange-900 via-pink-900 to-rose-900 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* 个人信息与联系方式 */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold mb-3 text-orange-200">姚洪琴的课程成果展示</h3>
            <p className="text-gray-300 mb-2">创作者新闻学2班</p>
            <p className="text-gray-400 text-sm mb-4">展示我的学习成果和项目作品</p>
            
            {/* 联系方式 */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-orange-300 mb-2">联系方式</h4>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-gray-300">
                <span className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center text-xs">📧</span>
                <span>学校邮箱</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-gray-300">
                <span className="w-4 h-4 bg-pink-400 rounded-full flex items-center justify-center text-xs">💬</span>
                <span>微信咨询</span>
              </div>
            </div>
          </div>

          {/* Wakatime 详细统计 */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-3 text-pink-200">编程时间统计</h3>
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span className="ml-2 text-gray-300">加载中...</span>
              </div>
            ) : error ? (
              <div className="text-red-300">
                <p className="text-sm">数据加载失败</p>
                <p className="text-xs text-gray-400">{error}</p>
              </div>
            ) : wakatimeData ? (
              <div className="space-y-3">
                {wakatimeData.data && wakatimeData.data.total_seconds !== undefined ? (
                  <>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <p className="text-2xl font-bold text-orange-300">
                        {formatTime(wakatimeData.data.total_seconds)}
                      </p>
                      <p className="text-sm text-gray-300">今日编程时间</p>
                    </div>
                    
                    {/* 额外统计信息 */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/5 rounded p-2">
                        <p className="text-orange-300 font-semibold">本周目标</p>
                        <p className="text-gray-300">20小时</p>
                      </div>
                      <div className="bg-white/5 rounded p-2">
                        <p className="text-pink-300 font-semibold">学习天数</p>
                        <p className="text-gray-300">连续15天</p>
                      </div>
                    </div>
                    
                    {wakatimeData.data.range && (
                      <p className="text-xs text-gray-400">
                        统计日期: {formatDate(wakatimeData.data.range.date)}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-orange-300">暂无数据</p>
                    <p className="text-sm text-gray-300">今日编程时间</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-300">暂无数据</p>
            )}
          </div>

          {/* 学习进度与成就 */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-3 text-rose-200">学习进度</h3>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Web开发</span>
                  <span className="text-sm text-orange-300">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-orange-400 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">JavaScript</span>
                  <span className="text-sm text-pink-300">78%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-pink-400 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">React/Next.js</span>
                  <span className="text-sm text-rose-300">72%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-rose-400 h-2 rounded-full" style={{width: '72%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 技术栈与项目链接 */}
          <div className="text-center lg:text-right">
            <h3 className="text-xl font-bold mb-3 text-orange-200">技术栈</h3>
            <div className="flex flex-wrap justify-center lg:justify-end gap-2 mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition-colors">Next.js</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition-colors">React</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition-colors">JavaScript</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition-colors">Tailwind CSS</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition-colors">Cloudflare Workers</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition-colors">Python</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition-colors">HTML/CSS</span>
            </div>
            
            {/* 项目链接 */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-orange-300 mb-2">相关链接</h4>
              <div className="space-y-1 text-sm">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">📁 GitHub 项目</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">📊 Wakatime 统计</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">📝 学习笔记</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">🎯 课程作业</a>
              </div>
            </div>
          </div>
        </div>

        {/* 分割线与版权信息 */}
        <div className="border-t border-white/20 pt-6 mt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} 姚洪琴. All Rights Reserved.</p>
          <p className="mt-1">
            Powered by <a href="https://nextjs.org" className="hover:text-white">Next.js</a> & <a href="https://wakatime.com" className="hover:text-white">Wakatime</a>.
            Deployed on <a href="https://vercel.com" className="hover:text-white">Vercel</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}