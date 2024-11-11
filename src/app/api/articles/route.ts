import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

// Fonction pour générer un slug cohérent
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  if (id) {
    const { data, error } = await supabase
      .from("articles")
      .select()
      .eq("id", id)
      .single();

    if (error)
      return NextResponse.json(
        { message: "Article non trouvé" },
        { status: 404 }
      );
    return NextResponse.json(data);
  }

  if (slug) {
    const { data, error } = await supabase
      .from("articles")
      .select()
      .eq("slug", slug)
      .single();

    if (error)
      return NextResponse.json(
        { message: "Article non trouvé" },
        { status: 404 }
      );
    return NextResponse.json(data);
  }

  const { data, error } = await supabase
    .from("articles")
    .select()
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json(
      { message: "Erreur lors de la récupération des articles" },
      { status: 500 }
    );
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const articleData = await request.json();
  articleData.slug = generateSlug(articleData.title);

  const { data, error } = await supabase
    .from("articles")
    .insert(articleData)
    .select()
    .single();

  if (error)
    return NextResponse.json(
      {
        message: "Erreur lors de la création de l'article",
        error: error.message,
      },
      { status: 500 }
    );
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const updatedArticle = await request.json();
  if (updatedArticle.title) {
    updatedArticle.slug = generateSlug(updatedArticle.title);
  }

  const { data, error } = await supabase
    .from("articles")
    .update(updatedArticle)
    .eq("id", updatedArticle.id)
    .select()
    .single();

  if (error)
    return NextResponse.json(
      {
        message: "Article non trouvé ou erreur lors de la mise à jour",
        error: error.message,
      },
      { status: 404 }
    );
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error)
      return NextResponse.json(
        {
          message: "Erreur lors de la suppression de l'article",
          error: error.message,
        },
        { status: 500 }
      );
    return NextResponse.json({ message: "Article supprimé avec succès" });
  }

  return NextResponse.json({ message: "ID non fourni" }, { status: 400 });
}
