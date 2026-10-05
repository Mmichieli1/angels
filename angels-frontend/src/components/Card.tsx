import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div
      style={{
        borderRadius: "8px",
        padding: "20px 40px 30px 40px",
        marginBottom: 0,
        margin: "0 auto",
        boxShadow:
          "0 0.5rem 1rem 0 rgba(3, 3, 3, 0.16), 0 0 0.375rem 0 rgba(3, 3, 3, 0.08)",
        maxWidth: "500px",
        borderTop: "4px solid",
        borderColor: "#06C",
        background: "#FFF",
      }}
    >
      {title && (
        <header style={{ marginBottom: "10px" }}>
          <h1
            id="card-title"
            style={{
              marginTop: "10px",
              fontSize: "24px",
              textAlign: "center",
              fontWeight: "300",
              color: "#000",
            }}
          >
            {title}
          </h1>
        </header>
      )}
      <div id="card-title" style={{ width: "100%" }}>
        {children && children}
      </div>
    </div>
  );
}

export default Card;
