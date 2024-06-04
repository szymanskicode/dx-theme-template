import { Component, ErrorInfo, ReactNode } from "react";
import { handleError } from "./handle-error";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    handleError({
      comment: "Error caught by ErrorBoundary.", //
      error,
      showToast: false,
      isTrackable: true,
      trackName: `ErrorPage_${error}`,
      trackProperties: { errorInfo },
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "30px",
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: "#1f3989",
          }}
        >
          <div style={{ background: "#ffffff", color: "#000", padding: "30px", borderRadius: "5px", textAlign: "center" }}>
            <img src="./logo/qlearn-logo-cb.png" alt="logo" style={{ width: "120px", marginBottom: "30px" }} />
            <p style={{ fontSize: "22px", fontWeight: 100, margin: "0 0 15px 0", textAlign: "left" }}>Sorry, something went wrong</p>
            <p style={{ fontSize: "14px", fontWeight: 400, margin: "0 0 15px 0", textAlign: "left" }}>An unexpected error has occured.</p>
            <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "5px", padding: "15px" }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  display: "inline-block",
                  fontSize: "12px",
                  fontWeight: 200,
                  margin: "0",
                  padding: "8px 10px",
                  borderRadius: "5px",
                  border: "2px solid #1f3989",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Refresh page
              </button>
              <div style={{ width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                <hr style={{ width: "100%", border: 0, borderTop: "1px solid #c5c5c5", margin: 0, padding: 0 }} />
                <span
                  style={{
                    color: "#c5c5c5",
                    background: "#fff",
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "8px",
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  OR
                </span>
              </div>
              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  display: "inline-block",
                  fontSize: "12px",
                  fontWeight: 200,
                  margin: "0",
                  padding: "8px 10px",
                  borderRadius: "5px",
                  border: "2px solid #1f3989",
                  background: "#1f3989",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
