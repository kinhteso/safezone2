import type { Post } from "../types";

type FeaturedPost = Omit<Post, "updated_at">;

const now = new Date();

export const FEATURED_POSTS: FeaturedPost[] = [
  {
    id: "featured-1",
    title:
      "SafeZone kh\u1edfi \u0111\u1ed9ng giai \u0111o\u1ea1n MVP t\u1ea1i c\u00e1c tr\u01b0\u1eddng h\u1ecdc th\u00ed \u0111i\u1ec3m",
    slug: "safezone-khoi-dong-giai-doan-mvp-tai-cac-truong-hoc-thi-diem",
    excerpt:
      "D\u1ef1 \u00e1n b\u01b0\u1edbc v\u00e0o giai \u0111o\u1ea1n tri\u1ec3n khai ban \u0111\u1ea7u, t\u1eadp trung ph\u00f2ng ng\u1eeba ch\u1ee7 \u0111\u1ed9ng trong m\u00f4i tr\u01b0\u1eddng h\u1ecdc \u0111\u01b0\u1eddng.",
    content: `
      <p>Giai \u0111o\u1ea1n MVP c\u1ee7a SafeZone t\u1eadp trung v\u00e0o b\u1ed1n nh\u00f3m t\u00ednh n\u0103ng c\u1ed1t l\u00f5i: tin t\u1ee9c, t\u1ed1 gi\u00e1c \u1ea9n danh, t\u01b0 v\u1ea5n AI v\u00e0 dashboard qu\u1ea3n tr\u1ecb.</p>
      <p>C\u00e1ch ti\u1ebfp c\u1eadn n\u00e0y gi\u00fap nh\u00e0 tr\u01b0\u1eddng v\u00e0 ph\u1ee5 huynh c\u00f3 th\u00eam c\u00f4ng c\u1ee5 ph\u00f2ng ng\u1eeba ch\u1ee7 \u0111\u1ed9ng.</p>
    `,
    thumbnail: "/news-thumbnails/mvp-launch.svg",
    category: "news",
    tags: ["SafeZone", "MVP", "Tr\u01b0\u1eddng h\u1ecdc"],
    published: true,
    view_count: 268,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    id: "featured-2",
    title:
      "Chuy\u00ean \u0111\u1ec1 truy\u1ec1n th\u00f4ng h\u1ecdc \u0111\u01b0\u1eddng: nh\u1eadn di\u1ec7n th\u1ee7 \u0111o\u1ea1n ma t\u00fay ng\u1ee5y trang",
    slug: "chuyen-de-truyen-thong-hoc-duong-nhan-dien-thu-doan-ma-tuy-nguy-trang",
    excerpt:
      "SafeZone t\u1ed5ng h\u1ee3p c\u00e1c d\u1ea5u hi\u1ec7u r\u1ee7i ro \u0111\u1ec3 nh\u00e0 tr\u01b0\u1eddng n\u00e2ng cao hi\u1ec7u qu\u1ea3 truy\u1ec1n th\u00f4ng ph\u00f2ng ng\u1eeba.",
    content: `
      <p>B\u00e0i vi\u1ebft cung c\u1ea5p checklist nh\u1eadn di\u1ec7n d\u1ea5u hi\u1ec7u b\u1ea5t th\u01b0\u1eddng trong b\u1ed1i c\u1ea3nh tr\u01b0\u1eddng h\u1ecdc.</p>
      <p>M\u1ee5c ti\u00eau l\u00e0 gi\u00fap gi\u00e1o vi\u00ean, h\u1ecdc sinh v\u00e0 ph\u1ee5 huynh c\u00f3 c\u00e1ch \u1ee9ng ph\u00f3 s\u1edbm v\u00e0 \u0111\u00fang h\u01b0\u1edbng.</p>
    `,
    thumbnail: "/news-thumbnails/news-campaign-awareness.svg",
    category: "news",
    tags: ["Truy\u1ec1n th\u00f4ng h\u1ecdc \u0111\u01b0\u1eddng", "Ng\u1ee5y trang", "Ph\u00f2ng ng\u1eeba"],
    published: true,
    view_count: 132,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "featured-3",
    title:
      "Khung ph\u00e1p l\u00fd tr\u1ecdng t\u00e2m v\u1ec1 ph\u00f2ng, ch\u1ed1ng ma t\u00fay c\u1ea7n ph\u1ed5 bi\u1ebfn trong tr\u01b0\u1eddng",
    slug: "khung-phap-ly-trong-tam-ve-phong-chong-ma-tuy-can-pho-bien-trong-truong",
    excerpt:
      "T\u1ed5ng h\u1ee3p c\u00e1c n\u1ed9i dung ph\u00e1p l\u00fd c\u1ed1t l\u00f5i \u0111\u1ec3 nh\u00e0 tr\u01b0\u1eddng truy\u1ec1n th\u00f4ng \u0111\u00fang h\u01b0\u1edbng.",
    content: `
      <p>Lu\u1eadt Ph\u00f2ng, ch\u1ed1ng ma t\u00fay n\u0103m 2021 l\u00e0 n\u1ec1n t\u1ea3ng quan tr\u1ecdng cho c\u00f4ng t\u00e1c ph\u00f2ng ng\u1eeba v\u00e0 ph\u1ed1i h\u1ee3p x\u1eed l\u00fd.</p>
      <p>Nh\u00e0 tr\u01b0\u1eddng c\u1ea7n k\u1ebft h\u1ee3p quy \u0111\u1ecbnh h\u00e0nh ch\u00ednh v\u00e0 h\u00ecnh s\u1ef1 \u0111\u1ec3 nh\u1eadn di\u1ec7n \u0111\u00fang m\u1ee9c \u0111\u1ed9 v\u1ee5 vi\u1ec7c.</p>
    `,
    thumbnail: "/news-thumbnails/law-framework.svg",
    category: "law",
    tags: ["Lu\u1eadt ph\u00f2ng ch\u1ed1ng ma t\u00fay", "Tu\u00e2n th\u1ee7", "Tr\u01b0\u1eddng h\u1ecdc"],
    published: true,
    view_count: 204,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "featured-4",
    title:
      "Ph\u00e2n bi\u1ec7t x\u1eed l\u00fd h\u00e0nh ch\u00ednh v\u00e0 x\u1eed l\u00fd h\u00ecnh s\u1ef1 trong h\u00e0nh vi li\u00ean quan ma t\u00fay",
    slug: "phan-biet-xu-ly-hanh-chinh-va-xu-ly-hinh-su-trong-cac-hanh-vi-lien-quan-ma-tuy",
    excerpt:
      "L\u00e0m r\u00f5 ranh gi\u1edbi gi\u1eefa vi ph\u1ea1m h\u00e0nh ch\u00ednh v\u00e0 t\u1ed9i ph\u1ea1m ma t\u00fay \u0111\u1ec3 tr\u00e1nh \u0111\u00e1nh gi\u00e1 sai.",
    content: `
      <p>Trong b\u1ed1i c\u1ea3nh h\u1ecdc \u0111\u01b0\u1eddng, vi\u1ec7c ph\u00e2n lo\u1ea1i sai h\u00e0nh vi c\u00f3 th\u1ec3 d\u1eabn \u0111\u1ebfn x\u1eed l\u00fd kh\u00f4ng ph\u00f9 h\u1ee3p.</p>
      <p>Nh\u00e0 tr\u01b0\u1eddng n\u00ean x\u00e1c minh theo checklist ph\u00e1p l\u00fd v\u00e0 ph\u1ed1i h\u1ee3p \u0111\u01a1n v\u1ecb chuy\u00ean m\u00f4n.</p>
    `,
    thumbnail: "/news-thumbnails/law-balance.svg",
    category: "law",
    tags: ["H\u00e0nh ch\u00ednh", "H\u00ecnh s\u1ef1", "Ph\u00e2n lo\u1ea1i h\u00e0nh vi"],
    published: true,
    view_count: 189,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: "featured-5",
    title:
      "D\u1ea5u hi\u1ec7u c\u1ea3nh b\u00e1o s\u1edbm \u1edf h\u1ecdc sinh c\u1ea7n \u0111\u01b0\u1ee3c theo d\u00f5i li\u00ean t\u1ee5c",
    slug: "dau-hieu-canh-bao-som-o-hoc-sinh-can-duoc-theo-doi-lien-tuc",
    excerpt:
      "T\u1ed5ng h\u1ee3p nh\u00f3m d\u1ea5u hi\u1ec7u h\u00e0nh vi v\u00e0 t\u00e2m l\u00fd \u0111\u1ec3 h\u1ed7 tr\u1ee3 can thi\u1ec7p s\u1edbm trong nh\u00e0 tr\u01b0\u1eddng.",
    content: `
      <p>Kh\u00f4ng ph\u1ea3i m\u1ecdi thay \u0111\u1ed5i h\u00e0nh vi \u0111\u1ec1u li\u00ean quan ma t\u00fay, nh\u01b0ng t\u1ed5 h\u1ee3p d\u1ea5u hi\u1ec7u l\u1eb7p l\u1ea1i c\u1ea7n \u0111\u01b0\u1ee3c l\u01b0u \u00fd.</p>
      <p>C\u1ea7n k\u1ebft h\u1ee3p quan s\u00e1t h\u1ecdc v\u1ee5, h\u00e0nh vi l\u1edbp h\u1ecdc v\u00e0 th\u00f4ng tin t\u1eeb ph\u1ee5 huynh \u0111\u1ec3 c\u00f3 nh\u1eadn \u0111\u1ecbnh c\u00e2n b\u1eb1ng.</p>
    `,
    thumbnail: "/news-thumbnails/knowledge-early-signs.svg",
    category: "knowledge",
    tags: ["C\u1ea3nh b\u00e1o s\u1edbm", "H\u1ecdc sinh", "Can thi\u1ec7p"],
    published: true,
    view_count: 211,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 8).toISOString(),
  },
  {
    id: "featured-6",
    title:
      "H\u01b0\u1edbng d\u1eabn trao \u0111\u1ed5i v\u1edbi ph\u1ee5 huynh khi ph\u00e1t hi\u1ec7n r\u1ee7i ro trong tr\u01b0\u1eddng h\u1ecdc",
    slug: "huong-dan-trao-doi-voi-phu-huynh-khi-phat-hien-rui-ro-trong-truong-hoc",
    excerpt:
      "G\u1ee3i \u00fd khung trao \u0111\u1ed5i b\u00ecnh t\u0129nh, t\u00f4n tr\u1ecdng v\u00e0 t\u1eadp trung gi\u1ea3i ph\u00e1p h\u1ed7 tr\u1ee3 h\u1ecdc sinh.",
    content: `
      <p>Giao ti\u1ebfp v\u1edbi ph\u1ee5 huynh l\u00e0 kh\u00e2u quan tr\u1ecdng trong x\u1eed l\u00fd r\u1ee7i ro h\u1ecdc \u0111\u01b0\u1eddng.</p>
      <p>Nh\u00e0 tr\u01b0\u1eddng n\u00ean th\u1ed1ng nh\u1ea5t m\u1eabu trao \u0111\u1ed5i: n\u00eau s\u1ef1 ki\u1ec7n \u0111\u00e3 x\u00e1c minh, gi\u1edbi h\u1ea1n suy di\u1ec5n v\u00e0 \u0111\u1ecbnh h\u01b0\u1edbng b\u01b0\u1edbc ti\u1ebfp theo.</p>
    `,
    thumbnail: "/news-thumbnails/knowledge-parent-dialogue.svg",
    category: "knowledge",
    tags: ["Ph\u1ee5 huynh", "Giao ti\u1ebfp", "H\u1ed7 tr\u1ee3 h\u1ecdc sinh"],
    published: true,
    view_count: 167,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "featured-7",
    title:
      "M\u00f4 h\u00ecnh ph\u1ed1i h\u1ee3p 3 b\u00ean trong x\u1eed l\u00fd v\u1ee5 vi\u1ec7c c\u00f3 d\u1ea5u hi\u1ec7u li\u00ean quan ma t\u00fay",
    slug: "mo-hinh-phoi-hop-3-ben-trong-xu-ly-vu-viec-co-dau-hieu-lien-quan-ma-tuy",
    excerpt:
      "G\u1ee3i \u00fd quy tr\u00ecnh ph\u1ed1i h\u1ee3p gi\u1eefa nh\u00e0 tr\u01b0\u1eddng, gia \u0111\u00ecnh v\u00e0 c\u01a1 quan ch\u1ee9c n\u0103ng \u0111\u1ec3 x\u1eed l\u00fd k\u1ecbp th\u1eddi.",
    content: `
      <p>B\u00e0i vi\u1ebft \u0111\u1ec1 xu\u1ea5t c\u00e1ch ph\u00e2n vai r\u00f5 \u0111\u1ea7u m\u1ed1i gi\u1eefa c\u00e1c b\u00ean trong t\u1eebng giai \u0111o\u1ea1n x\u1eed l\u00fd.</p>
      <p>Khung ph\u1ed1i h\u1ee3p gi\u00fap gi\u1ea3m \u0111\u1ed9 tr\u1ec5 ph\u1ea3n \u1ee9ng v\u00e0 t\u0103ng t\u00ednh nh\u1ea5t qu\u00e1n khi trao \u0111\u1ed5i th\u00f4ng tin.</p>
    `,
    thumbnail: "/news-thumbnails/news-protocol.svg",
    category: "news",
    tags: ["Ph\u1ed1i h\u1ee3p 3 b\u00ean", "Nh\u00e0 tr\u01b0\u1eddng", "Quy tr\u00ecnh"],
    published: true,
    view_count: 156,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: "featured-8",
    title:
      "Chi\u1ebfn d\u1ecbch truy\u1ec1n th\u00f4ng theo th\u00e1ng gi\u00fap t\u0103ng nh\u1eadn th\u1ee9c ph\u00f2ng, ch\u1ed1ng ma t\u00fay",
    slug: "chien-dich-truyen-thong-theo-thang-giup-tang-nhan-thuc-phong-chong-ma-tuy",
    excerpt:
      "SafeZone \u0111\u1ec1 xu\u1ea5t chu k\u1ef3 truy\u1ec1n th\u00f4ng ng\u1eafn, d\u1ec5 tri\u1ec3n khai \u0111\u1ec3 duy tr\u00ec nh\u1eadn th\u1ee9c li\u00ean t\u1ee5c.",
    content: `
      <p>Thay v\u00ec truy\u1ec1n th\u00f4ng r\u1eddi r\u1ea1c, nh\u00e0 tr\u01b0\u1eddng c\u00f3 th\u1ec3 x\u00e2y d\u1ef1ng c\u00e1c ch\u1ee7 \u0111\u1ec1 theo th\u00e1ng g\u1eafn v\u1edbi t\u00ecnh hu\u1ed1ng th\u1ef1c t\u1ebf.</p>
      <p>C\u00e1ch l\u00e0m n\u00e0y gi\u00fap h\u1ecdc sinh ghi nh\u1edb t\u1ed1t h\u01a1n v\u00e0 t\u0103ng t\u1ea7n su\u1ea5t t\u01b0\u01a1ng t\u00e1c t\u00edch c\u1ef1c.</p>
    `,
    thumbnail: "/news-thumbnails/news-awareness-cycle.svg",
    category: "news",
    tags: ["Truy\u1ec1n th\u00f4ng", "Nh\u1eadn th\u1ee9c", "Chi\u1ebfn d\u1ecbch"],
    published: true,
    view_count: 143,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "featured-9",
    title:
      "Nh\u1eefng \u0111i\u1ec3m c\u1ea7n l\u01b0u \u00fd khi nh\u00e0 tr\u01b0\u1eddng thu th\u1eadp v\u00e0 l\u01b0u tr\u1eef d\u1eef li\u1ec7u t\u1ed1 gi\u00e1c",
    slug: "nhung-diem-can-luu-y-khi-nha-truong-thu-thap-va-luu-tru-du-lieu-to-giac",
    excerpt:
      "T\u00f3m t\u1eaft c\u00e1c nguy\u00ean t\u1eafc ph\u00e1p l\u00fd quan tr\u1ecdng trong qu\u1ea3n l\u00fd d\u1eef li\u1ec7u nh\u1ea1y c\u1ea3m \u1edf m\u00f4i tr\u01b0\u1eddng h\u1ecdc.",
    content: `
      <p>D\u1eef li\u1ec7u t\u1ed1 gi\u00e1c c\u1ea7n \u0111\u01b0\u1ee3c x\u1eed l\u00fd theo nguy\u00ean t\u1eafc t\u1ed1i thi\u1ec3u h\u00f3a v\u00e0 \u0111\u00fang m\u1ee5c \u0111\u00edch.</p>
      <p>Nh\u00e0 tr\u01b0\u1eddng n\u00ean ph\u00e2n quy\u1ec1n truy c\u1eadp r\u00f5 r\u00e0ng, l\u01b0u nh\u1eadt k\u00fd thao t\u00e1c v\u00e0 gi\u1edbi h\u1ea1n chia s\u1ebb n\u1ed9i b\u1ed9.</p>
    `,
    thumbnail: "/news-thumbnails/law-data-governance.svg",
    category: "law",
    tags: ["D\u1eef li\u1ec7u t\u1ed1 gi\u00e1c", "B\u1ea3o m\u1eadt", "Tu\u00e2n th\u1ee7"],
    published: true,
    view_count: 172,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: "featured-10",
    title:
      "C\u00e1ch chu\u1ea9n b\u1ecb h\u1ed3 s\u01a1 th\u00f4ng tin khi chuy\u1ec3n tuy\u1ebfn v\u1ee5 vi\u1ec7c \u0111\u1ebfn c\u01a1 quan c\u00f3 th\u1ea9m quy\u1ec1n",
    slug: "cach-chuan-bi-ho-so-thong-tin-khi-chuyen-tuyen-vu-viec-den-co-quan-co-tham-quyen",
    excerpt:
      "H\u01b0\u1edbng d\u1eabn b\u1ed9 th\u00f4ng tin c\u1ea7n thi\u1ebft \u0111\u1ec3 qu\u00e1 tr\u00ecnh chuy\u1ec3n tuy\u1ebfn \u0111\u1ea7y \u0111\u1ee7 v\u00e0 \u0111\u00fang quy tr\u00ecnh.",
    content: `
      <p>Khi chuy\u1ec3n tuy\u1ebfn v\u1ee5 vi\u1ec7c, n\u1ed9i dung c\u1ea7n \u0111\u01b0\u1ee3c m\u00f4 t\u1ea3 r\u00f5, theo th\u1eddi gian v\u00e0 c\u00f3 c\u0103n c\u1ee9 x\u00e1c minh.</p>
      <p>Vi\u1ec7c chu\u1ea9n h\u00f3a h\u1ed3 s\u01a1 gi\u00fap h\u1ea1n ch\u1ebf sai l\u1ec7ch th\u00f4ng tin v\u00e0 r\u00fat ng\u1eafn th\u1eddi gian x\u1eed l\u00fd.</p>
    `,
    thumbnail: "/news-thumbnails/law-case-file.svg",
    category: "law",
    tags: ["Chuy\u1ec3n tuy\u1ebfn", "H\u1ed3 s\u01a1", "Th\u1ea9m quy\u1ec1n"],
    published: true,
    view_count: 161,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "featured-11",
    title:
      "K\u1ef9 n\u0103ng l\u1eafng nghe kh\u00f4ng ph\u00e1n x\u00e9t khi h\u1ecdc sinh ch\u1ee7 \u0111\u1ed9ng chia s\u1ebb",
    slug: "ky-nang-lang-nghe-khong-phan-xet-khi-hoc-sinh-chu-dong-chia-se",
    excerpt:
      "Nh\u1eefng nguy\u00ean t\u1eafc giao ti\u1ebfp c\u01a1 b\u1ea3n gi\u00fap t\u0103ng ni\u1ec1m tin v\u00e0 h\u1ed7 tr\u1ee3 h\u1ecdc sinh hi\u1ec7u qu\u1ea3.",
    content: `
      <p>L\u1eafng nghe kh\u00f4ng ph\u00e1n x\u00e9t gi\u00fap h\u1ecdc sinh c\u1ea3m th\u1ea5y an to\u00e0n khi n\u00f3i v\u1ec1 kh\u00f3 kh\u0103n.</p>
      <p>Gi\u00e1o vi\u00ean v\u00e0 c\u00e1n b\u1ed9 t\u01b0 v\u1ea5n n\u00ean \u01b0u ti\u00ean c\u00e2u h\u1ecfi m\u1edf, x\u00e1c nh\u1eadn c\u1ea3m x\u00fac v\u00e0 \u0111\u1ecbnh h\u01b0\u1edbng h\u1ed7 tr\u1ee3 ti\u1ebfp theo.</p>
    `,
    thumbnail: "/news-thumbnails/knowledge-support-listen.svg",
    category: "knowledge",
    tags: ["L\u1eafng nghe", "T\u00e2m l\u00fd h\u1ecdc \u0111\u01b0\u1eddng", "H\u1ed7 tr\u1ee3"],
    published: true,
    view_count: 176,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "featured-12",
    title:
      "X\u00e2y d\u1ef1ng m\u1ea1ng l\u01b0\u1edbi b\u1ea1n \u0111\u1ed3ng \u0111\u1eb3ng \u0111\u1ec3 h\u1ed7 tr\u1ee3 ph\u00f2ng ng\u1eeba trong l\u1edbp h\u1ecdc",
    slug: "xay-dung-mang-luoi-ban-dong-dang-de-ho-tro-phong-ngua-trong-lop-hoc",
    excerpt:
      "G\u1ee3i \u00fd m\u00f4 h\u00ecnh b\u1ea1n \u0111\u1ed3ng \u0111\u1eb3ng gi\u00fap lan t\u1ecfa h\u00e0nh vi t\u00edch c\u1ef1c v\u00e0 ph\u00e1t hi\u1ec7n r\u1ee7i ro s\u1edbm.",
    content: `
      <p>M\u1ea1ng l\u01b0\u1edbi b\u1ea1n \u0111\u1ed3ng \u0111\u1eb3ng c\u00f3 th\u1ec3 \u0111\u00f3ng vai tr\u00f2 c\u1ea7u n\u1ed1i gi\u1eefa h\u1ecdc sinh v\u00e0 c\u00e1n b\u1ed9 h\u1ed7 tr\u1ee3.</p>
      <p>N\u1ebfu \u0111\u01b0\u1ee3c hu\u1ea5n luy\u1ec7n \u0111\u00fang c\u00e1ch, nh\u00f3m b\u1ea1n n\u00f2ng c\u1ed1t s\u1ebd gi\u00fap lan t\u1ecfa nh\u1eadn th\u1ee9c v\u00e0 gi\u1ea3m k\u1ef3 th\u1ecb.</p>
    `,
    thumbnail: "/news-thumbnails/knowledge-peer-network.svg",
    category: "knowledge",
    tags: ["B\u1ea1n \u0111\u1ed3ng \u0111\u1eb3ng", "Ph\u00f2ng ng\u1eeba", "L\u1edbp h\u1ecdc"],
    published: true,
    view_count: 158,
    school_id: null,
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
];

export function mergePostsWithFeatured(posts?: Post[] | null) {
  const safePosts = Array.isArray(posts) ? posts : [];
  const existingSlugs = new Set(safePosts.map((post) => post.slug));
  const merged = [...safePosts];

  for (const featured of FEATURED_POSTS) {
    if (!existingSlugs.has(featured.slug)) {
      merged.push({ ...featured, updated_at: featured.created_at });
    }
  }

  return merged.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function findFeaturedPostBySlug(slug: string) {
  const post = FEATURED_POSTS.find((item) => item.slug === slug);
  if (!post) return null;
  return { ...post, updated_at: post.created_at };
}
