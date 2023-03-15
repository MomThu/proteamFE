/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import Loading from 'components/Loading';
import React, { Component } from 'react';

type ErrorBoundaryProps = {
  children?: React.ReactNode;
  pending?: boolean;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any): void {
    // You can also log the error to an error reporting service
    this.setState({ hasError: true });
  }

  handleReloadPage(): void {
    window?.location?.reload?.();
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="h-[100vh] bg-slate-50">
          <div className="h-[10%]" />
          <div className="text-center">
            <Title level={3} className="mb-3 text-[20px]">
              Vui lòng tải lại trang!
            </Title>
            <Button type="primary" className="font-bold rounded-md" onClick={this.handleReloadPage}>
              Tải lại
            </Button>
          </div>
        </div>
      );
    }

    if (this.props.pending) {
      return <Loading />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
