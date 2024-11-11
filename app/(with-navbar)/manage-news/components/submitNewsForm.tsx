import React, { useState } from "react";
import styles from "./submitNewsForm.module.scss";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import { createNews } from "@/lib/api";
import toast from "react-hot-toast";

type SubmitNewsFormProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function SubmitNewsForm({ isOpen, onClose }: SubmitNewsFormProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        resource: "",
        reference: "",
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const { title, description, resource, reference } = formData;

        if (!title || !description || !resource || !reference) {
            setErrors({
                title: !title ? "El título es requerido" : "",
                description: !description ? "La descripción es requerida" : "",
                resource: !resource ? "El recurso es requerido" : "",
                reference: !reference ? "La referencia es requerida" : "",
            });
            return;
        }

        setErrors({});
        try {
            const response = await createNews(formData);
            if (response.status === 201) {
                toast.success("Noticia publicada exitosamente.");
                onClose();
                window.location.reload();
            } else {
                toast.error("Error al publicar la noticia.");
            }
        } catch (error) {
            toast.error("Error en el servidor.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Publicar Noticia</h2>
                <TextField
                    placeholder="Ingrese el título de la noticia"
                    name="title"
                    label="Título"
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    placeholder="Ingrese la descripción de la noticia"
                    name="description"
                    label="Descripción"
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <TextField
                    placeholder="Ingrese el nombre del diario"
                    name="resource"
                    label="Diario"
                    value={formData.resource}
                    onChange={(e) => updateField("resource", e.target.value)}
                    error={!!errors.resource}
                    helperText={errors.resource}
                />
                <TextField
                    placeholder="Ingrese la referencia"
                    name="reference"
                    label="Referencia"
                    value={formData.reference}
                    onChange={(e) => updateField("reference", e.target.value)}
                    error={!!errors.reference}
                    helperText={errors.reference}
                />
                <div className={styles.buttons}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Publicar</Button>
                </div>
            </div>
        </div>
    );
}
