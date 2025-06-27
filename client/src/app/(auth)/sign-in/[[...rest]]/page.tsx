import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "#e6f0fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%"
            }}>
                <SignIn
                    redirectUrl="/auth-redirect"
                    appearance={{
                        elements: {
                            card: { boxShadow: "0 4px 32px rgba(0,0,0,0.08)", borderRadius: 0 },
                            formButtonPrimary: { backgroundColor: "#2563eb" }
                        }
                    }}
                />
            </div>
        </div>
    );
}
