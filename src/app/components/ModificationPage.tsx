'use client';

import { useCallback } from "react";
import styles from './ModificationPage.module.css';

interface ModificationPageProps {
    onSubmit: () => void;
    onSecondaryAction?: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    secondaryActionLabel?: string;
}

const ModificationPage: React.FC<ModificationPageProps> = ({
    onSubmit,
    onSecondaryAction,
    title,
    body,
    footer,
    actionLabel,
    secondaryActionLabel,
}) => {
    const handleSubmit = useCallback(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div className={styles.pageContainer}>
            <div>
                <div className={styles.title}>{title}</div>

                <div className={styles.body}>{body}</div>

                <div className={styles.actionContainer}>
                    <button className={styles.actionButton} onClick={handleSubmit}>{actionLabel}</button>
                    {secondaryActionLabel && onSecondaryAction && (
                        <button className={styles.secondaryButton} onClick={onSecondaryAction}>
                            {secondaryActionLabel}
                        </button>
                    )}
                    {footer}
                </div>
            </div>
        </div>
    );
}

export default ModificationPage;

