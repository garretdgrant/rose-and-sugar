import { NextResponse } from "next/server";
import {
  fetchRecipeByHandle,
  fetchRecipesCollection,
  isRecipeProduct,
} from "@/lib/shopifyRecipes";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle")?.trim();
  const collectionHandle = searchParams.get("collection")?.trim() || "recipes";

  try {
    if (handle) {
      const product = await fetchRecipeByHandle(handle);
      if (!product) {
        return NextResponse.json(
          { ok: false, error: "Recipe not found." },
          { status: 404 },
        );
      }

      if (!isRecipeProduct(product)) {
        return NextResponse.json(
          { ok: false, error: "Product is not marked as a recipe." },
          { status: 404 },
        );
      }

      return NextResponse.json({
        ok: true,
        product,
      });
    }

    const { collectionTitle, products } =
      await fetchRecipesCollection(collectionHandle);
    if (products.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No recipe products found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      collectionTitle,
      products,
    });
  } catch (error: unknown) {
    console.error("[SHOPIFY_RECIPES_ERROR]", error);
    return NextResponse.json(
      { ok: false, error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
