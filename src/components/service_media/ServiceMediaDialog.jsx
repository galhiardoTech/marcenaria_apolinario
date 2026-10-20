import { useEffect, useId, useRef } from 'react';
import { getServiceWhatsAppUrl } from '../../data/whatsapp.js';
import './ServiceMediaDialog.css';

export default function ServiceMediaDialog({ service, onClose }) {
    const dialogRef = useRef(null);
    const titleId = useId();

    useEffect(() => {
        if (!service) return;

        const dialog = dialogRef.current;
        const video = dialog.querySelector('video');
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';

        return () => {
            video?.pause();
            if (dialog.open) dialog.close();
            document.body.style.overflow = previousOverflow;
        };
    }, [service]);

    return (
        <dialog
            ref={dialogRef}
            className="service-dialog"
            aria-labelledby={titleId}
            onClose={onClose}
            onClick={event => {
                if (event.target === event.currentTarget) dialogRef.current.close();
            }}
        >
            {service && (
                <>
                    <div className="service-dialog__header">
                        <div>
                            <p className="service-dialog__category">{service.category}</p>
                            <h2 id={titleId}>{service.title}</h2>
                        </div>
                        <button
                            type="button"
                            className="service-dialog__close"
                            aria-label="Fechar fotos do serviço"
                            onClick={() => dialogRef.current.close()}
                        >
                            ×
                        </button>
                    </div>
                    <div className="service-dialog__content">
                        <img className="service-dialog__photo" src={service.img} alt={service.imageAlt ?? service.title} />
                        <p className="service-dialog__description">{service.details ?? service.description}</p>
                        {service.video && (
                            <section className="service-dialog__video-section" aria-label={service.videoTitle}>
                                <h3>{service.videoTitle}</h3>
                                <video
                                    className="service-dialog__video"
                                    src={service.video}
                                    controls
                                    muted
                                    playsInline
                                    preload="none"
                                    aria-label={service.videoTitle}
                                />
                            </section>
                        )}
                        <a className="service-dialog__quote" href={getServiceWhatsAppUrl(service)} target="_blank" rel="noopener noreferrer">
                            Solicitar orçamento deste serviço
                        </a>
                    </div>
                </>
            )}
        </dialog>
    );
}
