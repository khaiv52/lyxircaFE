// ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Cập nhật state để hiển thị UI thay thế khi có lỗi
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Ghi lại lỗi vào dịch vụ báo cáo lỗi nếu cần
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Hiển thị fallback UI khi có lỗi
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
  