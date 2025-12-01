import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, List, Space, Spin, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { PlayCircleOutlined, MenuOutlined, SettingOutlined, SoundOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import styles from './tts_mobile_pro.less';

// 定义音频播放状态类型
interface AudioItem {
  id: string;
  text: string;
  audioUrl: string;
  isPlaying: boolean;
  progress: number;
}

const TTSMobilePro: React.FC = () => {
  const intl = useIntl();
  const [inputText, setInputText] = useState<string>('');
  const [audioList, setAudioList] = useState<AudioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const animationRefs = useRef<Map<string, number>>(new Map());

  // 初始化测试数据
  useEffect(() => {
    const testAudio: AudioItem = {
      id: `test-${Date.now()}`,
      text: '这是一条测试音频，用于演示文字转语音功能。',
      audioUrl: '/test.wav',
      isPlaying: false,
      progress: 0,
    };
    setAudioList([testAudio]);
  }, []);

  // 播放音频
  const playAudio = (item: AudioItem) => {
    const audio = audioRefs.current.get(item.id);
    if (!audio) return;

    if (item.isPlaying) {
      // 暂停
      audio.pause();
      cancelAnimationFrame(animationRefs.current.get(item.id) || 0);
    } else {
      // 播放
      audio.play().catch(err => {
        message.error('音频播放失败：' + err.message);
      });
      // 启动进度动画
      const updateProgress = () => {
        if (audio.duration) {
          const progress = (audio.currentTime / audio.duration) * 100;
          setAudioList(prev => prev.map(a => 
            a.id === item.id ? { ...a, progress } : a
          ));
        }
        animationRefs.current.set(item.id, requestAnimationFrame(updateProgress));
      };
      updateProgress();
    }

    // 更新播放状态
    setAudioList(prev => prev.map(a => 
      a.id === item.id ? { ...a, isPlaying: !a.isPlaying } : a
    ));
  };

  // 音频结束事件
  const handleAudioEnded = (id: string) => {
    setAudioList(prev => prev.map(a => 
      a.id === id ? { ...a, isPlaying: false, progress: 0 } : a
    ));
    cancelAnimationFrame(animationRefs.current.get(id) || 0);
  };

  // 生成语音
  const generateAudio = async () => {
    if (!inputText.trim()) {
      message.warning('请输入文本内容');
      return;
    }

    setLoading(true);
    try {
      // 调用HTTP接口获取音频链接（这里模拟接口调用）
      // 实际项目中替换为真实接口请求
      const mockAudioUrl = '/test.wav'; // 模拟返回的音频链接
      
      // 创建新的音频条目
      const newItem: AudioItem = {
        id: `audio-${Date.now()}`,
        text: inputText.trim().substring(0, 20), // 只显示前20个字
        audioUrl: mockAudioUrl,
        isPlaying: false,
        progress: 0,
      };

      // 插入列表数据结构尾部（注意：最新的数据在最上面，所以需要unshift）
      setAudioList(prev => [newItem, ...prev].slice(0, 10)); // 最多展示10条
      setInputText(''); // 清空输入框
      message.success('语音生成成功');
    } catch (error) {
      message.error('语音生成失败：' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // 上拉加载更多
  const onLoadMore = () => {
    setLoadMoreLoading(true);
    // 模拟加载历史数据
    setTimeout(() => {
      // 这里可以添加加载历史数据的逻辑
      setLoadMoreLoading(false);
      message.info('已加载全部数据');
    }, 1500);
  };

  // 加载更多的组件
  const loadMore = () => {
    return (
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        {loadMoreLoading ? <Spin /> : '上拉加载更多'}
      </div>
    );
  };

  // 渲染音频列表项
  const renderAudioItem = (item: AudioItem) => (
    <div className={styles.audioItem} key={item.id}>
      {/* 播放按钮 */}
      <div className={styles.playBtnContainer}>
        <div
          className={`${styles.playBtn} ${item.isPlaying ? styles.playing : ''}`}
          style={{ background: `conic-gradient(#00ff88 ${item.progress}%, transparent ${item.progress}%)` }}
          onClick={() => playAudio(item)}
        >
          <div className={styles.playIcon}>
            <PlayCircleOutlined />
          </div>
        </div>
        {/* 隐藏的音频元素 */}
        <audio
          ref={el => {
            if (el) audioRefs.current.set(item.id, el);
          }}
          src={item.audioUrl}
          onEnded={() => handleAudioEnded(item.id)}
        />
      </div>

      {/* 文本内容 */}
      <div className={styles.textContent}>{item.text}</div>

      {/* 菜单按钮 */}
      <div className={styles.menuBtn}>
        <MenuOutlined />
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* 顶部标题栏 */}
      <div className={styles.header}>
        <div className={styles.title}>{intl.formatMessage({ id: 'tts.title', defaultMessage: '文字转语音' })}</div>
        <Button type="primary" ghost className={styles.registerBtn}>
          {intl.formatMessage({ id: 'tts.register', defaultMessage: '注册' })}
        </Button>
      </div>

      {/* Banner区 */}
      <div className={styles.banner}>
        <div className={styles.bannerPlaceholder}>
          <SoundOutlined className={styles.bannerIcon} />
          <span>{intl.formatMessage({ id: 'tts.banner', defaultMessage: 'banner 图片' })}</span>
        </div>
      </div>

      {/* 内容列表 */}
      <div className={styles.contentList}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={onLoadMore}
          hasMore={!loadMoreLoading}
          useWindow={false}
        >
          <List
            dataSource={audioList}
            renderItem={renderAudioItem}
            locale={{ emptyText: '暂无音频数据' }}
            loadMore={loadMore()}
          />
        </InfiniteScroll>
      </div>

      {/* 底部输入区 */}
      <div className={styles.footer}>
        <div className={styles.inputContainer}>
          <Input.TextArea
            placeholder={intl.formatMessage({ id: 'tts.inputPlaceholder', defaultMessage: '输入中英文' })}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onPressEnter={generateAudio}
            autoSize={{ minRows: 1, maxRows: 3 }}
          />
        </div>

        <Space className={styles.footerButtons}>
          <Button
            type="primary"
            onClick={generateAudio}
            loading={loading}
            className={styles.generateBtn}
          >
            {intl.formatMessage({ id: 'tts.generate', defaultMessage: '生成' })}
          </Button>
          <Button icon={<SettingOutlined />} className={styles.settingBtn} />
        </Space>
      </div>
    </div>
  );
};

export default TTSMobilePro;