import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

/* 错误边界 — 防止 3D Canvas 崩溃导致白屏 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex items-center justify-center min-h-[400px] bg-[#050510] text-slate-500 text-sm">
          组件加载失败，请刷新页面重试
        </div>
      );
    }
    return this.props.children;
  }
}
