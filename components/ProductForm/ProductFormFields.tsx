"use client";
import React from "react";
import TextField from "./fields/TextField";
import NumberField from "./fields/NumberField";
import CheckboxField from "./fields/CheckboxField";
import ImageUploadField from "./ImageUploadField";
import { Brand, Category, Option, ProductFormState } from "./types";
import SelectField from "./fields/SelectField";

interface Props {
  form: ProductFormState;
  setForm: (updater: (prev: ProductFormState) => ProductFormState) => void;
  categories: Category[];
  brands: Brand[];
}

const ProductFormFields: React.FC<Props> = ({ form, setForm, categories, brands }) => {
  const catOptions: Option<number>[] = categories.map((c) => ({ value: c.id, label: c.title }));
  const brandOptions: Option<number>[] = brands.map((b) => ({ value: b.id, label: b.title }));

  return (
    <>
      <TextField
        label="Title"
        value={form.title}
        onChange={(v) => setForm((p) => ({ ...p, title: v }))}
        required
      />

      <NumberField
        label="Price"
        value={form.price}
        onChange={(v) => setForm((p) => ({ ...p, price: v }))}
        step="0.01"
        required
      />

      <TextField
        label="Description"
        value={form.description}
        onChange={(v) => setForm((p) => ({ ...p, description: v }))}
        required
        multiline
        rows={5}
      />

      <CheckboxField
        label="Is Featured"
        checked={form.isFeatured}
        onChange={(v) => setForm((p) => ({ ...p, isFeatured: v }))}
      />

      <TextField
        label="Clothes Type"
        value={form.clothesType}
        onChange={(v) => setForm((p) => ({ ...p, clothesType: v }))}
        required
      />

      <SelectField
        label="Category"
        value={form.categoryId}
        onChange={(v) => setForm((p) => ({ ...p, categoryId: v as number | "" }))}
        options={catOptions}
        required
      />

      <SelectField
        label="Brand"
        value={form.brandId}
        onChange={(v) => setForm((p) => ({ ...p, brandId: v as number | "" }))}
        options={brandOptions}
        placeholder="Select Brand (optional)"
      />

      <TextField
        label="Colors (comma-separated)"
        value={form.colors}
        onChange={(v) => setForm((p) => ({ ...p, colors: v }))}
      />

      <TextField
        label="Sizes (comma-separated)"
        value={form.sizes}
        onChange={(v) => setForm((p) => ({ ...p, sizes: v }))}
      />

      <ImageUploadField
        value={form.imageUrl ? form.imageUrl.split(",").map((s) => s.trim()) : []}
        onChange={(urls: string[]) =>
          setForm((p) => ({ ...p, imageUrl: urls.join(", ") }))
        }
      />
    </>
  );
};

export default ProductFormFields;