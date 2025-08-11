import Link from "next/link"
import { Inter } from "next/font/google"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import {
  Search,
  Shield,
  Sparkles,
  BarChart3,
  Building2,
  MapPin,
  MessageSquare,
  Gauge,
  Star,
  CheckCircle2,
} from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <div className={`${inter.className} bg-gray-50 text-gray-900`}>
      <Navigation />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-white">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="w-full lg:w-1/2">
              <Badge className="bg-white/10 hover:bg-white/15 text-white border border-white/20 mb-4">
                Modern Real Estate Platform
              </Badge>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                DreamHome
                <span className="block mt-2">แพลตฟอร์มอสังหาฯ ครบวงจรสำหรับทุกคน</span>
              </h1>
              <p className="mt-5 text-white/90 text-base sm:text-lg max-w-2xl">
                ค้นหา ซื้อ เช่า หรือประกาศขายได้ในที่เดียว ประสบการณ์ที่ลื่นไหล ปลอดภัย และฉลาดขึ้นด้วยแดชบอร์ดและอินไซต์เรียลไทม์
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/buy" aria-label="ไปยังหน้า Buy">
                  <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
                    เริ่มค้นหาบ้าน
                  </Button>
                </Link>
                <Link href="/sell" aria-label="ไปยังหน้า Sell">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    ลงประกาศขาย
                  </Button>
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">ยืนยันตัวตนปลอดภัย</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  <span className="text-sm">ทำงานรวดเร็ว</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">แชทกับผู้ขายได้ทันที</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-2 shadow-2xl">
                <img
                  src="/placeholder.svg?height=600&width=1000"
                  alt="ภาพตัวอย่างแดชบอร์ด DreamHome"
                  className="rounded-xl ring-1 ring-white/20"
                />
                <div className="absolute -bottom-4 left-6 right-6 hidden sm:block">
                  <div className="rounded-xl bg-white/90 p-4 shadow-xl text-gray-800">
                    <p className="text-sm">อินเทอร์เฟซใช้งานง่าย เก็บรายการโปรด ดูสถิติ และติดต่อผู้ขายได้ในไม่กี่คลิก</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust row */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-90">
            <img src="/placeholder.svg?height=40&width=160" alt="พาร์ทเนอร์ 1" className="mx-auto h-8 w-auto" />
            <img src="/placeholder.svg?height=40&width=160" alt="พาร์ทเนอร์ 2" className="mx-auto h-8 w-auto" />
            <img src="/placeholder.svg?height=40&width=160" alt="พาร์ทเนอร์ 3" className="mx-auto h-8 w-auto" />
            <img src="/placeholder.svg?height=40&width=160" alt="พาร์ทเนอร์ 4" className="mx-auto h-8 w-auto" />
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section id="features" className="py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">คุณสมบัติเด่น</Badge>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">ทุกอย่างที่คุณต้องการในที่เดียว</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">สำหรับผู้ซื้อ ผู้เช่า ผู้ขาย และทีมงาน—ทำงานร่วมกันได้อย่างราบรื่น</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <Card className="shadow-sm hover:shadow-md transition">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Search className="h-5 w-5" />
                </div>
                <CardTitle>ค้นหาทรงพลัง</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                กรองตามทำเล ประเภท ราคา และสิ่งอำนวยความสะดวกได้อย่างยืดหยุ่น เก็บรายการโปรดไว้ดูภายหลัง
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Building2 className="h-5 w-5" />
                </div>
                <CardTitle>แดชบอร์ดผู้ขาย</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">สร้างและบริหารประกาศ ปรับราคา สถานะ และตอบแชทลูกค้าได้ทันที</CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <CardTitle>ปลอดภัยสูง</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">การยืนยันตัวตนและสิทธิ์การเข้าถึงตามบทบาท สบายใจทั้งผู้ซื้อและผู้ขาย</CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <CardTitle>อินไซต์เรียลไทม์</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">ดูสถิติมุมมองและการติดต่อ ช่วยตัดสินใจปรับปรุงประกาศอย่างมั่นใจ</CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <CardTitle>ประสบการณ์ลื่นไหล</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">Mobile-first โหลดไว ใช้งานง่ายทุกอุปกรณ์ ดีไซน์สะอาดตา</CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Star className="h-5 w-5" />
                </div>
                <CardTitle>รองรับการเติบโต</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">ออกแบบมาให้ปรับขยายได้ เพิ่มฟีเจอร์ใหม่ได้อย่างเป็นระบบ</CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">ภาพรวมระบบ</Badge>
            <h3 className="mt-3 text-2xl sm:text-3xl font-bold">บริหารจัดการครบวงจร</h3>
            <p className="mt-3 text-gray-600">
              ตั้งแต่การค้นหา ลงประกาศ คุยกับลูกค้า ไปจนถึงวิเคราะห์สถิติ—DreamHome ออกแบบเพื่อให้ทุกบทบาททำงานร่วมกันได้จริง
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              {[
                {
                  icon: <MapPin className="h-5 w-5 text-emerald-600 mt-0.5" />,
                  text: "ค้นหาแบบละเอียดพร้อมแผนที่และสิ่งอำนวยความสะดวก",
                },
                {
                  icon: <MessageSquare className="h-5 w-5 text-emerald-600 mt-0.5" />,
                  text: "แชทระหว่างผู้ซื้อกับผู้ขายได้ทันที",
                },
                {
                  icon: <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />,
                  text: "สิทธิ์การเข้าถึงตามบทบาท ปลอดภัยและโปร่งใส",
                },
              ].map((i, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  {i.icon}
                  <span>{i.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-3">
              <Link href="/buy">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">ลองค้นหา</Button>
              </Link>
              <Link href="/sell">
                <Button
                  variant="outline"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                >
                  สร้างประกาศแรกของคุณ
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <img
              src="/placeholder.svg?height=520&width=900"
              alt="ภาพรวมประกาศและสถิติ"
              className="rounded-xl border border-gray-200 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-emerald-50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">ผู้ใช้จริงพูดถึงเรา</Badge>
            <h3 className="mt-3 text-2xl sm:text-3xl font-bold">ช่วยปิดการขายและหาบ้านได้เร็วขึ้น</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {[
              {
                name: "คุณพลอย",
                role: "ผู้ขายบ้าน",
                quote: "ลงประกาศไม่ถึงสัปดาห์ก็มีลูกค้าทักแชทเข้ามาหลายราย ใช้งานง่ายและเห็นสถิติชัดเจนมาก",
              },
              {
                name: "คุณต้น",
                role: "ผู้เช่า",
                quote: "ระบบค้นหาดีมาก กรองง่าย เจอห้องตรงงบและทำเลเร็ว ประหยัดเวลาไปเยอะเลยครับ",
              },
              {
                name: "คุณแนน",
                role: "ผู้ซื้อ",
                quote: "ดีไซน์สวย ลื่นไหล ใช้มือถือก็สะดวก ชอบที่คุยกับเจ้าของได้ทันที",
              },
            ].map((t, i) => (
              <Card key={i} className="shadow-sm">
                <CardContent className="pt-6">
                  <p className="text-gray-700">"{t.quote}"</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{t.name}</span> • {t.role}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">คำถามที่พบบ่อย</Badge>
            <h3 className="mt-3 text-2xl sm:text-3xl font-bold">FAQ</h3>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>ใช้งานฟรีหรือไม่?</AccordionTrigger>
              <AccordionContent>
                เริ่มใช้งานและค้นหาฟรี การลงประกาศพื้นฐานไม่เสียค่าใช้จ่าย อาจมีฟีเจอร์เสริมแบบพรีเมียมในอนาคต
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>ปลอดภัยแค่ไหน?</AccordionTrigger>
              <AccordionContent>เรามีระบบยืนยันตัวตนและการจัดการสิทธิ์ตามบทบาท ปกป้องข้อมูลและความเป็นส่วนตัวของผู้ใช้</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>มีทีมซัพพอร์ตไหม?</AccordionTrigger>
              <AccordionContent>มีทีมซัพพอร์ตและคู่มือการใช้งาน พร้อมแชทช่วยเหลือในหน้าเว็บไซต์</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-emerald-50 to-transparent" />
            <div className="relative p-8 sm:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-bold">พร้อมเริ่มต้นกับ DreamHome แล้วหรือยัง?</h4>
                  <p className="mt-2 text-gray-600">ค้นหาบ้านในฝันหรือประกาศขายของคุณได้ในไม่กี่คลิก</p>
                </div>
                <div className="flex gap-3">
                  <Link href="/buy">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">เริ่มค้นหา</Button>
                  </Link>
                  <Link href="/sell">
                    <Button
                      variant="outline"
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                    >
                      ลงประกาศขาย
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  )
}
