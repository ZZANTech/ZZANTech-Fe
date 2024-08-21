import { createServerClient } from "@supabase/ssr";
import dayjs from "dayjs";
import { NextResponse, type NextRequest } from "next/server";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function redirectTo(request: NextRequest, destination: string) {
  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url);
}

function handleUserRedirection(user: any, request: NextRequest) {
  const knowhowPattern = /^\/boards\/knowhow\/\d+$/;

  if (!user) {
    if (knowhowPattern.test(request.nextUrl.pathname)) {
      return redirectTo(request, "/login");
    }

    if (request.nextUrl.pathname.includes("write")) {
      return redirectTo(request, "/login");
    }

    if (request.nextUrl.pathname === "/exchange" && request.nextUrl.searchParams.get("filter") === "claim") {
      const url = request.nextUrl.clone();
      url.pathname = "/exchange";
      url.searchParams.delete("filter");
      return NextResponse.redirect(url);
    }

    if (request.nextUrl.pathname.startsWith("/mypage")) {
      return redirectTo(request, "/");
    }
  }

  if (user && (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup"))) {
    return redirectTo(request, "/");
  }
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const redirectionResponse = handleUserRedirection(user, request);
  if (redirectionResponse) return redirectionResponse;

  if (request.nextUrl.pathname.startsWith("/quiz") && !request.nextUrl.pathname.startsWith("/quiz/completed")) {
    if (user) {
      const todayStart = dayjs().utc().startOf("day").toISOString();
      const { data, error } = await supabase
        .from("answers")
        .select("answerId")
        .eq("user_id", user.id)
        .gte("created_at", todayStart)
        .single();

      if (error && error.code !== "PGRST116") {
        return redirectTo(request, "/error");
      }

      if (data) {
        return redirectTo(request, "/quiz/completed");
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/quiz/:path*"]
};
