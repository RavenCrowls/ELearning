"use client";
import Header from "./Header";
import HeaderStudent from "./Header-stu";
import { getAuthToken } from "@/app/utils/auth";
import { useEffect, useState } from "react";

export default function HeaderSwitcher() {
    const [isMounted, setIsMounted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const checkToken = () => setIsLoggedIn(!!getAuthToken());
        checkToken();
        window.addEventListener("storage", checkToken);
        window.addEventListener("authChanged", checkToken);
        return () => {
            window.removeEventListener("storage", checkToken);
            window.removeEventListener("authChanged", checkToken);
        };
    }, []);

    if (!isMounted) return null;

    return isLoggedIn ? <HeaderStudent /> : <Header />;
}
