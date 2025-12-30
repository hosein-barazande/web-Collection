"use client";

import {useState} from "react";
import styles from "./SitemapGenerator.module.css";

export default function SitemapGenerator() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [showBox, setShowBox] = useState(false);
    const [error, setError] = useState("");

    const crawlHandler = async () => {
        if (!url) return;

        setLoading(true);
        setShowBox(false);
        setError("");

        try {
            const res = await fetch("/crawl", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({url}),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "خطا در کراول");
            }

            setResult(data.xml);
            setShowBox(true);
        } catch (err: any) {
            setError(err.message || "خطای شبکه");
        } finally {
            setLoading(false);
        }
    };

    const copyHandler = async () => {
        await navigator.clipboard.writeText(result);
    };

    const resetHandler = () => {
        setUrl("");
        setResult("");
        setShowBox(false);
        setError("");
    };

    return (
        <div className={styles.page}>
            <div className={styles.box}>
                <h1 className={styles.title}>پانیذ سایت‌ مپ جنریتور</h1>

                <div className={styles.form}>
                    <input
                        type="url"
                        placeholder="https://example.com/page"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className={styles.input}
                    />

                    <button onClick={crawlHandler} disabled={loading} className={styles.button}>
                        {loading ? "در حال کراول..." : "شروع کراول"}
                    </button>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                {showBox && (
                    <div className={styles.resultBox}>
                        <textarea value={result} readOnly className={styles.textarea} rows={16} />

                        <div className={styles.buttonGroup}>
                            <button onClick={copyHandler} className={styles.copyButton}>
                                کپی کردن سایت‌مپ
                            </button>
                            <button onClick={resetHandler} className={styles.resetButton}>
                                ریست کردن کراولر
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
