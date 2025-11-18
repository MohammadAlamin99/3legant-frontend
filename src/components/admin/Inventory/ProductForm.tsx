"use client";
import React, { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import { createProduct } from "@/actions/user.action";
import { getCookie } from "@/helper/Token";
import { IProductForm } from "@/types/productForm.type";

type VariantOption = { key: string; value: string };
type Variant = {
  sku: string;
  title: string;
  options: VariantOption[];
  price: number | "";
  compareAtPrice: number | "";
  barcode?: string;
  image: File | null;
  stock: number | "";
  isActive: boolean;
};

export default function ProductFormFull() {
  const [product, setProduct] = useState<IProductForm>({
    title: "",
    description: "",
    collections: "",
    images: [],
    featureImage: null,
    tags: [],
    badge: "",
    basePrice: "",
    compareAtPrice: "",
    attributes: [{ key: "", value: "" }],
    metafields: [{ title: "", content: "" }],
    status: "active",
    isTaxable: true,
    shippingRequired: true,
    weight: "",
    dimensions: { l: "", w: "", h: "" },
  });

  const [variants, setVariants] = useState<Variant[]>([
    {
      sku: "",
      title: "",
      options: [{ key: "", value: "" }],
      price: "",
      compareAtPrice: "",
      barcode: "",
      image: null,
      stock: "",
      isActive: true,
    },
  ]);

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [featurePreview, setFeaturePreview] = useState<string | null>(null);
  const [variantPreviews, setVariantPreviews] = useState<(string | null)[]>(
    variants.map(() => null)
  );

  // Handlers
  const updateProductField = <K extends keyof IProductForm>(field:K, value:IProductForm[K])=>{
    setProduct((p)=>({...p, [field]:value}))
  }

  const handleImagesChange = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setProduct((p) => ({ ...p, images: arr }));
    setImagePreviews(arr.map((f) => URL.createObjectURL(f)));
  };

  const handleFeatureChange = (file: File | null) => {
    setProduct((p) => ({ ...p, featureImage: file }));
    setFeaturePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      setProduct((p) => ({
        ...p,
        tags: [...p.tags, e.currentTarget.value.trim()],
      }));
      e.currentTarget.value = "";
    }
  };


  const removeTag = (idx: number) =>
    setProduct((p) => ({ ...p, tags: p.tags.filter((_, i) => i !== idx) }));

  // Attributes
  const addAttribute = () =>
    setProduct((p) => ({
      ...p,
      attributes: [...p.attributes, { key: "", value: "" }],
    }));
  const updateAttribute = (i: number, k: "key" | "value", v: string) => {
    const attrs = [...product.attributes];
    attrs[i][k] = v;
    setProduct((p) => ({ ...p, attributes: attrs }));
  };
  const removeAttribute = (i: number) =>
    setProduct((p) => ({
      ...p,
      attributes: product.attributes.filter((_, idx) => idx !== i),
    }));

  // Metafields
  const addMetafield = () =>
    setProduct((p) => ({
      ...p,
      metafields: [...p.metafields, { title: "", content: "" }],
    }));
  const updateMetafield = (i: number, k: "title" | "content", v: string) => {
    const arr = [...product.metafields];
    arr[i][k] = v;
    setProduct((p) => ({ ...p, metafields: arr }));
  };
  const removeMetafield = (i: number) =>
    setProduct((p) => ({
      ...p,
      metafields: product.metafields.filter((_, idx) => idx !== i),
    }));

  // Variants
  const addVariant = () =>
    setVariants((v) => [
      ...v,
      {
        sku: "",
        title: "",
        options: [{ key: "", value: "" }],
        price: "",
        compareAtPrice: "",
        barcode: "",
        image: null,
        stock: "",
        isActive: true,
      },
    ]);
  const removeVariant = (idx: number) =>
    setVariants((v) => v.filter((_, i) => i !== idx));
  const updateVariantField = <K extends keyof Variant>(
    idx: number,
    field: K,
    value: Variant[K]
  ) => {
    const v = [...variants];
    v[idx] = { ...v[idx], [field]: value };
    setVariants(v);
  };
  const addVariantOption = (idx: number) => {
    const v = [...variants];
    v[idx].options.push({ key: "", value: "" });
    setVariants(v);
  };
  const updateVariantOption = (
    vIdx: number,
    oIdx: number,
    field: "key" | "value",
    val: string
  ) => {
    const v = [...variants];
    v[vIdx].options[oIdx][field] = val;
    setVariants(v);
  };
  const removeVariantOption = (vIdx: number, oIdx: number) => {
    const v = [...variants];
    v[vIdx].options.splice(oIdx, 1);
    setVariants(v);
  };
  const handleVariantImage = (idx: number, file: File | null) => {
    updateVariantField(idx, "image", file);
    setVariantPreviews((prev) => {
      const arr = [...prev];
      arr[idx] = file ? URL.createObjectURL(file) : null;
      return arr;
    });
  };

  useEffect(() => {
    setVariantPreviews((prev) => {
      const diff = variants.length - prev.length;
      if (diff > 0) return [...prev, ...Array(diff).fill(null)];
      return prev.slice(0, variants.length);
    });
  }, [variants.length]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", product.title);
      fd.append("description", product.description);
      product.collections
        .split(",")
        .filter(Boolean)
        .forEach((id) => fd.append("collections", id));
      fd.append("tags", JSON.stringify(product.tags));
      fd.append("badge", product.badge);
      fd.append("basePrice", String(product.basePrice || 0));
      if (product.compareAtPrice !== "")
        fd.append("compareAtPrice", String(product.compareAtPrice));
      fd.append("status", product.status);
      fd.append("isTaxable", String(product.isTaxable));
      fd.append("shippingRequired", String(product.shippingRequired));
      if (product.weight !== "") fd.append("weight", String(product.weight));
      fd.append("dimensions", JSON.stringify(product.dimensions));
      fd.append(
        "attributes",
        JSON.stringify(
          Object.fromEntries(
            product.attributes
              .filter((a) => a.key.trim())
              .map((a) => [a.key, a.value])
          )
        )
      );
      fd.append(
        "metafields",
        JSON.stringify(
          product.metafields.filter((m) => m.title.trim() || m.content.trim())
        )
      );
      product.images.forEach((file) => fd.append("images", file));
      if (product.featureImage) fd.append("featureImage", product.featureImage);

      const variantsForBody = variants.map((v) => ({
        sku: v.sku,
        title: v.title,
        options: Object.fromEntries(
          v.options.filter((o) => o.key.trim()).map((o) => [o.key, o.value])
        ),
        price: v.price === "" ? 0 : Number(v.price),
        compareAtPrice:
          v.compareAtPrice === "" ? undefined : Number(v.compareAtPrice),
        barcode: v.barcode || undefined,
        image: v.image ? v.image.name : undefined,
        stock: v.stock === "" ? 0 : Number(v.stock),
        isActive: v.isActive,
      }));
      fd.append("variants", JSON.stringify(variantsForBody));
      variants.forEach((v) =>
        v.image && fd.append("variantImages", v.image)
      );

      const token: string | undefined = getCookie("token");
      const data = await createProduct(token || "", fd);

      alert("Product created successfully");
      console.log("Created product:", data);
    } catch (err) {
      alert(
        "Create product failed: " +
        (err instanceof Error ? err.message : String(err))
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Create Product</h2>

      {/* Title & Description */}
      <div>
        <label>Title</label>
        <input
          className="w-full border rounded p-2 mt-1"
          value={product.title}
          onChange={(e) => updateProductField("title", e.target.value)}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          className="w-full border rounded p-2 mt-1"
          rows={6}
          value={product.description}
          onChange={(e) => updateProductField("description", e.target.value)}
        />
      </div>

      {/* Collections */}
      <div>
        <label>Collections (comma-separated IDs)</label>
        <input
          className="w-full border rounded p-2 mt-1"
          value={product.collections}
          onChange={(e) => updateProductField("collections", e.target.value)}
        />
      </div>

      {/* Badge & Tags */}
      <div>
        <label>Badge</label>
        <input
          className="w-full border rounded p-2 mt-1"
          value={product.badge}
          onChange={(e) => updateProductField("badge", e.target.value)}
        />
      </div>
      <div>
        <label>Tags</label>
        <input
          placeholder="Press Enter to add"
          className="border p-2 rounded mt-1 w-full"
          onKeyDown={handleTagKeyDown}
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {product.tags.map((t, i) => (
            <div
              key={i}
              className="px-2 py-1 bg-gray-200 rounded flex items-center gap-2"
            >
              <span>{t}</span>
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="text-red-500"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Attributes */}
      <div>
        <label>Attributes</label>
        {product.attributes.map((a, idx) => (
          <div key={idx} className="flex gap-2 mt-1">
            <input
              placeholder="Key"
              value={a.key}
              className="border p-2 rounded flex-1"
              onChange={(e) => updateAttribute(idx, "key", e.target.value)}
            />
            <input
              placeholder="Value"
              value={a.value}
              className="border p-2 rounded flex-1"
              onChange={(e) => updateAttribute(idx, "value", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeAttribute(idx)}
              className="bg-red-500 text-white px-2 rounded"
            >
              x
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAttribute}
          className="bg-blue-500 text-white px-2 mt-2 rounded"
        >
          Add Attribute
        </button>
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Base Price</label>
          <input
            type="number"
            className="border p-2 rounded mt-1 w-full"
            value={product.basePrice}
            onChange={(e) =>
              updateProductField(
                "basePrice",
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
          />
        </div>
        <div>
          <label>Compare At Price</label>
          <input
            type="number"
            className="border p-2 rounded mt-1 w-full"
            value={product.compareAtPrice}
            onChange={(e) =>
              updateProductField(
                "compareAtPrice",
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <label>Product Images</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleImagesChange(e.target.files)}
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {imagePreviews.map((src, i) => (
            <Image
              key={i}
              src={src}
              width={60}
              height={60}
              alt="img"
              className="rounded"
            />
          ))}
        </div>
      </div>
      <div>
        <label>Feature Image</label>
        <input
          type="file"
          onChange={(e) => handleFeatureChange(e.target.files?.[0] ?? null)}
        />
        {featurePreview && (
          <Image
            src={featurePreview}
            width={80}
            height={80}
            alt="feature"
            className="rounded"
          />
        )}
      </div>

      {/* Dimensions */}
      <div>
        <label>Dimensions (L x W x H)</label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <input
            type="number"
            placeholder="Length"
            className="border p-2 rounded"
            value={product.dimensions.l}
            onChange={(e) =>
              updateProductField("dimensions", {
                ...product.dimensions,
                l: e.target.value === "" ? "" : Number(e.target.value),
              })
            }
          />
          <input
            type="number"
            placeholder="Width"
            className="border p-2 rounded"
            value={product.dimensions.w}
            onChange={(e) =>
              updateProductField("dimensions", {
                ...product.dimensions,
                w: e.target.value === "" ? "" : Number(e.target.value),
              })
            }
          />
          <input
            type="number"
            placeholder="Height"
            className="border p-2 rounded"
            value={product.dimensions.h}
            onChange={(e) =>
              updateProductField("dimensions", {
                ...product.dimensions,
                h: e.target.value === "" ? "" : Number(e.target.value),
              })
            }
          />
        </div>
      </div>

      {/* Metafields */}
      <div>
        <label>Metafields</label>
        {product.metafields.map((m, idx) => (
          <div key={idx} className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Title"
              value={m.title}
              className="border p-2 rounded flex-1"
              onChange={(e) => updateMetafield(idx, "title", e.target.value)}
            />
            <input
              type="text"
              placeholder="Content"
              value={m.content}
              className="border p-2 rounded flex-1"
              onChange={(e) => updateMetafield(idx, "content", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeMetafield(idx)}
              className="bg-red-500 text-white px-2 rounded"
            >
              x
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addMetafield}
          className="bg-blue-500 text-white px-2 mt-2 rounded"
        >
          Add Metafield
        </button>
      </div>

      {/* Variants */}
      <div>
        <label>Variants</label>
        {variants.map((v, idx) => (
          <div key={idx} className="border rounded p-4 mt-2 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <input
                placeholder="SKU"
                className="border p-2 rounded"
                value={v.sku}
                onChange={(e) => updateVariantField(idx, "sku", e.target.value)}
              />
              <input
                placeholder="Title"
                className="border p-2 rounded"
                value={v.title}
                onChange={(e) =>
                  updateVariantField(idx, "title", e.target.value)
                }
              />
              <input
                placeholder="Barcode"
                className="border p-2 rounded"
                value={v.barcode}
                onChange={(e) =>
                  updateVariantField(idx, "barcode", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <input
                type="number"
                placeholder="Price"
                className="border p-2 rounded"
                value={v.price}
                onChange={(e) =>
                  updateVariantField(
                    idx,
                    "price",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
              <input
                type="number"
                placeholder="Compare Price"
                className="border p-2 rounded"
                value={v.compareAtPrice}
                onChange={(e) =>
                  updateVariantField(
                    idx,
                    "compareAtPrice",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
              <input
                type="number"
                placeholder="Stock"
                className="border p-2 rounded"
                value={v.stock}
                onChange={(e) =>
                  updateVariantField(
                    idx,
                    "stock",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            </div>

            <div>
              <label>Options</label>
              {v.options.map((o, oIdx) => (
                <div key={oIdx} className="flex gap-2 mt-1">
                  <input
                    placeholder="Key"
                    className="border p-2 rounded flex-1"
                    value={o.key}
                    onChange={(e) =>
                      updateVariantOption(idx, oIdx, "key", e.target.value)
                    }
                  />
                  <input
                    placeholder="Value"
                    className="border p-2 rounded flex-1"
                    value={o.value}
                    onChange={(e) =>
                      updateVariantOption(idx, oIdx, "value", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeVariantOption(idx, oIdx)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    x
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addVariantOption(idx)}
                className="bg-blue-500 text-white px-2 mt-2 rounded"
              >
                Add Option
              </button>
            </div>

            <div>
              <label>Variant Image</label>
              <input
                type="file"
                onChange={(e) =>
                  handleVariantImage(idx, e.target.files?.[0] ?? null)
                }
              />
              {variantPreviews[idx] && (
                <Image
                  src={variantPreviews[idx]!}
                  width={60}
                  height={60}
                  alt="variant"
                  className="rounded"
                />
              )}
            </div>

            <button
              type="button"
              onClick={() => removeVariant(idx)}
              className="bg-red-500 text-white px-2 rounded mt-2"
            >
              Remove Variant
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          className="bg-green-500 text-white px-2 mt-2 rounded"
        >
          Add Variant
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-700 text-white px-6 py-2 mt-4 rounded"
      >
        Create Product
      </button>
    </form>
  );
}
