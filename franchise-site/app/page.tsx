"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { BrandFilm } from "@/components/brand-film";
import { MotionNumber, ScalpitExperience } from "@/components/scalpit-experience";
import { watchFranchiseJourney } from "@/lib/franchise-journey";
import { RevenueStudio } from "@/components/revenue-studio";
import { calculateEconomics } from "@/lib/franchise-economics";
import { RepeatVisitPlan, OperatingResponsibilities, RecoveryPlan, CapitalChecklist } from "@/components/franchise-assurance";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, LoaderCircle, Menu, Phone, Play, Clapperboard, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const stores = [
  {name:"동탄", area:"27평", investment:"1억 4천만", sales:"7,200", label:"월 최고 매출", target:"목표 7,000만원 달성", image:"/images/dongtan.webp"},
  {name:"천안", area:"30평", investment:"2억 2천만", sales:"7,800", label:"월 최고 매출", target:"목표 7,000만원 달성", image:"/images/cheonan.webp"},
  {name:"광교", area:"50평", investment:"3억", sales:"7,000", label:"오픈 첫 달", target:"목표 1억원", image:"/images/gwanggyo.webp"},
  {name:"압구정", area:"65평", investment:"5억", sales:"7,000", label:"오픈 첫 달", target:"목표 1억 5천만원", image:"/images/apgujeong-space.webp"},
];

const dongtan = [3900,4287,4668,5143,5526,4982,5718,6184,5837,6742,7148,6389,7200];
const cheonan = [3000,4200,4500,5600,6300,6800,7200,7480,7800];
const dongtanOps = [
  ["25.08","3,900","286","118","42.6%","13.6","390","6.8"],
  ["25.09","4,287","311","139","44.8%","13.8","429","7.1"],
  ["25.10","4,668","329","158","47.9%","14.2","467","7.4"],
  ["25.11","5,143","352","178","50.6%","14.6","514","7.7"],
  ["25.12","5,526","369","192","52.1%","15.0","553","7.9"],
  ["26.01","4,982","337","181","53.7%","14.8","498","7.6"],
  ["26.02","5,718","378","207","54.8%","15.1","572","8.0"],
  ["26.03","6,184","401","225","56.1%","15.4","618","8.2"],
  ["26.04","5,837","382","219","57.3%","15.3","584","7.9"],
  ["26.05","6,742","427","247","57.9%","15.8","674","8.4"],
  ["26.06","7,148","444","263","59.2%","16.1","715","8.7"],
  ["26.07","6,389","402","241","60.0%","15.9","639","8.1"],
  ["26.08","7,200","447","271","60.6%","16.1","720","8.8"],
];
const cheonanOps = [
  ["25.12","3,000","231","86","37.2%","13.0","300","6.1"],
  ["26.01","4,200","304","121","39.8%","13.8","420","6.7"],
  ["26.02","4,500","321","137","42.7%","14.0","450","7.0"],
  ["26.03","5,600","382","174","45.5%","14.7","560","7.6"],
  ["26.04","6,300","417","201","48.2%","15.1","630","8.1"],
  ["26.05","6,800","441","220","49.9%","15.4","680","8.3"],
  ["26.06","7,200","458","235","51.3%","15.7","720","8.6"],
  ["26.07","7,480","469","247","52.7%","16.0","748","8.8"],
  ["26.08","7,800","481","258","53.6%","16.2","780","9.0"],
];
const branchReels = [
  {name:"압구정", image:"/images/apgujeong-reception.webp", link:"https://www.instagram.com/reel/Dda0Fujq_AA/"},
  {name:"광교", image:"/images/gwanggyo.webp", link:"https://www.instagram.com/reel/Ddaz5P9qumT/"},
  {name:"천안", image:"/images/cheonan.webp", link:"https://www.instagram.com/reel/Ddazk2Dq0Ew/"},
  {name:"동탄", image:"/images/dongtan.webp", link:"https://www.instagram.com/reel/DdazZFMqbFR/"},
];
const marketingChannels = [
  {name:"네이버",asset:"naver",role:"플레이스 · 지역 검색"},
  {name:"인스타그램",asset:"instagram",role:"릴스 · 브랜드 콘텐츠"},
  {name:"유튜브",asset:"youtube",role:"쇼츠 · 영상 콘텐츠"},
  {name:"틱톡",asset:"tiktok",role:"숏폼 콘텐츠"},
  {name:"당근",asset:"daangn.png",role:"생활권 타깃 광고"},
  {name:"메타",asset:"meta",role:"광고 설계 · 집행"},
  {name:"페이스북",asset:"facebook",role:"피드 광고 · 재접점"},
  {name:"네이버 블로그",asset:"naver",role:"방문 전 정보 탐색"},
  {name:"네이버 카페",asset:"naver",role:"지역 커뮤니티 접점"},
];
const brandContent = ["DcgN4W8CpYh","DbXxXP-yQ30","Db27_pny8Ci","DctLr8UBxRc","DcknCM3C6qj","DbvFDUQx9pQ","Dbpjb2lpwCm","DbnR0i1TBxf","DbfxF6MJGRK","DbfPZ2cJ1W-","DbIcWaQgs0m","DbKp4nvB2D6","DbP_kcPSYoK","DbaUTsvvvXj","Db29jk4Nc-j"];

const customerReasons = [
  {n:"01",signal:"모발 변화가 신경 쓰일 때",title:"탈모·모발 고민",desc:"가늘어진 모발, 달라 보이는 가르마. 제품을 더 사기 전에 내 두피 상태부터 확인하고 싶은 고객.",care:"두피 촬영·상담 / 프리미엄 탈모 솔루션",opportunity:"명확한 고민에서 시작하는 정기 관리 수요"},
  {n:"02",signal:"매일 감아도 개운하지 않을 때",title:"각질·유분·두피 불편",desc:"샴푸를 바꿔도 반복되는 유분과 각질. 일상의 불편에서 관리가 시작되는 고객.",care:"두피 상태 상담 / 문제성 두피 케어",opportunity:"나이보다 생활 속 불편이 만드는 방문 이유"},
  {n:"03",signal:"몸의 변화에 맞는 관리가 필요할 때",title:"임신·출산 전후",desc:"임신 중 휴식, 출산 후 달라진 두피·모발 상담. 시기와 컨디션에 따라 이용 가능 여부부터 확인합니다.",care:"사전 상담 / 시기별 이용 코스 안내",opportunity:"생애 변화에 따라 새롭게 생기는 관리 수요"},
  {n:"04",signal:"스타일을 바꾸고, 관리도 챙길 때",title:"염색·펌을 즐기는 고객",desc:"스타일에는 꾸준히 투자하던 고객. 염색·펌 사이에 두피와 모발을 챙기는 시간을 찾습니다.",care:"두피 상태 상담 / 클렌징·모발 관리",opportunity:"기존 헤어 소비에 더해지는 관리 수요"},
  {n:"05",signal:"피부와 몸 다음, 두피까지",title:"뷰티·에스테틱 고객",desc:"피부와 몸에 이어 두피까지. 가격보다 관리 구성과 공간, 응대의 완성도를 보는 고객.",care:"시그니처 딥 릴렉싱 아로마 스파",opportunity:"관리에 익숙한 고객의 프리미엄 코스 선택"},
  {n:"06",signal:"멀리 떠나지 않고 쉬고 싶은 날",title:"휴식이 필요한 직장인",desc:"퇴근 후, 휴대폰까지 내려놓는 한 시간. 두피 고민보다 쉬고 싶은 마음으로 방문하는 고객.",care:"브레인 디톡스 / 프리미엄 디톡스",opportunity:"문제 해결을 넘어 휴식 목적으로 넓어지는 수요"},
  {n:"07",signal:"식사와 카페 다음 코스를 찾을 때",title:"커플·친구의 동반 방문",desc:"식사와 카페 다음, 함께할 새로운 경험. 한 사람의 관심이 두 사람의 예약으로 이어지는 방문.",care:"동반 예약 / 지점별 커플룸 안내",opportunity:"한 사람의 관심이 동행 고객의 방문으로 연결"},
  {n:"08",signal:"한국 여행 일정에 넣고 싶은 경험",title:"K뷰티 여행객",desc:"영상으로 저장해 둔 헤드스파. 한국 여행 일정에 맞춰 일부러 찾아오는 고객.",care:"외국어 메뉴 / 여행 일정에 맞춘 예약 안내",opportunity:"주변 거주 고객 밖으로 확장되는 목적 방문"},
];
const marketingWork = [
  {n:"01",title:"네이버 플레이스 관리",desc:"메뉴·가격·사진·매장 정보를 정돈하고, 지역 검색에서 예약 화면까지 이어지는 방문 경로를 관리합니다.",output:"매장 정보 · 사진 · 소식 · 예약 동선"},
  {n:"02",title:"네이버 체험단 모집",desc:"매장과 어울리는 체험자를 모집하고, 방문 일정과 콘텐츠 안내부터 발행 여부 확인까지 진행합니다.",output:"모집 · 섭외 · 일정 조율 · 콘텐츠 확인"},
  {n:"03",title:"지역 네이버 카페 홍보",desc:"매장 생활권의 커뮤니티에 맞춰 방문 이유와 오픈 소식, 프로모션을 구성하고 지역 고객과의 접점을 만듭니다.",output:"지역 선정 · 메시지 기획 · 게시 운영"},
  {n:"04",title:"검색형 블로그 콘텐츠·배포",desc:"지역명과 헤드스파, 두피 관리 등 고객이 찾는 주제를 중심으로 읽을거리와 매장 정보를 구성하고 발행합니다.",output:"키워드 기획 · 원고 · 이미지 · 발행 관리"},
  {n:"05",title:"구글 검색 최적화",desc:"외국인도 매장을 찾고 메뉴를 이해할 수 있도록 웹사이트의 검색 정보와 외국어 콘텐츠, 예약 연결을 정돈합니다.",output:"검색 정보 · 외국어 메뉴 · 예약 연결"},
  {n:"06",title:"광고 소재 제작",desc:"공간, 관리 과정, 고객의 방문 이유를 사진과 영상으로 만듭니다. 같은 매장도 고객에 따라 다르게 전달합니다.",output:"촬영 기획 · 영상 편집 · 이미지 · 광고 문구"},
  {n:"07",title:"메타 광고 집행",desc:"인스타그램·페이스북에서 지역과 고객층에 맞춰 광고를 집행합니다. 소재별 반응을 비교하며 예산과 메시지를 조정합니다.",output:"타깃 설계 · 소재 테스트 · 집행 · 개선"},
  {n:"08",title:"당근 비즈니스 광고",desc:"매장 인근 생활권 고객에게 오픈 소식과 방문 혜택을 알립니다. 지역 특성에 맞춰 문구와 노출 범위를 조정합니다.",output:"생활권 설정 · 지역 소재 · 광고 운영"},
];
const academyPlan = [
  {week:"WEEK 01—02",duration:"2주",title:"테라피스트 교육",lead:"처음부터 끝까지 직접 관리해 봅니다.",items:["고객 컨디션 확인과 관리 준비","순서·압력·제품 사용량 실습","고객 응대부터 마무리·위생까지"]},
  {week:"WEEK 03",duration:"1주",title:"상담 교육",lead:"왜 이 관리인지, 고객에게 설명합니다.",items:["촬영 화면으로 상태와 고민 확인","모의 상담으로 코스·가격 안내","질문 응대와 다음 관리 제안"]},
  {week:"WEEK 04",duration:"1주",title:"운영 교육",lead:"하루 영업을 직접 마감해 봅니다.",items:["예약 변경·근무 배치 연습","매출·비용·회원권 판매·소진 기록","재고 확인과 일 마감표 작성"]},
];
const reviewScenarios = [
  {reason:"커플 데이트",title:"밥, 카페 말고.\n이번 데이트는 여기.",body:"맨날 밥 먹고 카페 가는 게 뻔해서 같이 예약했어요. 끝나고 서로 어땠는지 얘기하는 것까지 재밌었네요. 비 오는 주말 데이트 코스로 추천하고 싶어요!",tags:["함께 즐기는 경험","주말 데이트"]},
  {reason:"수험생 자녀",title:"공부하느라 지친 아이에게\n쉬는 시간을 선물했어요.",body:"수능 준비하는 아이가 책상에만 앉아 있어 마음이 쓰였어요. 잠깐이라도 쉬라고 보내줬는데, 본인을 위해 예약해 준 게 더 좋았다고 하네요. 시험 끝나면 같이 가보려고요.",tags:["부모님의 예약","자녀를 위한 선물"]},
  {reason:"탈모·모발 고민",title:"정수리가 신경 쓰여서.\n관리의 시작이 필요했어요.",body:"사진 찍을 때마다 정수리부터 보게 되더라고요. 혼자 검색만 하다가 상담받아 보고 싶어 예약했어요. 당장 머리가 자라는 걸 기대하기보다, 제 두피 상태부터 제대로 알아보고 싶었어요.",tags:["두피 상태 상담","관리 루틴의 시작"]},
  {reason:"예민한 두피",title:"뾰루지가 신경 쓰여\n두피부터 들여다봤어요.",body:"두피에 뾰루지가 올라올 때마다 샴푸만 바꿨어요. 이번에는 상태를 먼저 살펴보고 평소 어떻게 씻고 관리하는지 이야기하고 싶었어요. 무턱대고 제품부터 사던 습관을 돌아보는 계기가 됐네요.",tags:["두피 고민","생활 관리 상담"]},
  {reason:"퇴근 후 휴식",title:"휴대폰도 내려놓고.\n오랜만에 제대로 쉬었네요.",body:"퇴근하고 집에 가면 또 휴대폰만 보다가 잠들거든요. 이날은 딱 저를 위해 시간을 비웠어요. 아무것도 안 하고 누워 있는 게 이렇게 반가울 줄 몰랐어요.",tags:["퇴근 후 예약","혼자만의 휴식"]},
  {reason:"부모님 선물",title:"늘 괜찮다던 엄마가\n다음엔 같이 가자고 하셨어요.",body:"엄마 생신에 뭘 드릴까 고민하다 예약해 드렸어요. 물건은 늘 필요 없다고 하셨는데, 쉬고 오시는 건 좋으셨나 봐요. 다음에는 저랑 둘이 가자고 먼저 말씀하셨어요.",tags:["생신 선물","가족 동반 방문"]},
  {reason:"염색·펌 후 관리",title:"머리 색은 자주 바꿔도\n두피는 처음 챙겨봤어요.",body:"염색하고 펌하는 데는 돈을 쓰면서 정작 두피는 한 번도 신경 안 썼더라고요. 이번엔 스타일 바꾸는 대신 관리받는 시간을 잡았어요. 앞으로는 두피 상태도 같이 살펴보려고요.",tags:["뷰티 관심 고객","두피 관리 입문"]},
  {reason:"K뷰티 여행",title:"릴스로 보고 저장한 곳.\n한국 여행 일정에 넣었어요.",body:"한국 가면 해보고 싶어서 영상을 저장해 뒀어요. 쇼핑만 하는 일정 사이에 이렇게 쉬어 가는 시간이 있으니 좋네요. 함께 온 친구와 이번 여행에서 기억나는 코스로 꼽았어요.",tags:["콘텐츠로 발견","여행 중 방문"]},
];
const reviewHighlights = [
  {image:"/images/reviews/review-22.webp",alt:"60분 내내 만족스러웠다는 스칼프잇 고객 리뷰"},
  {image:"/images/reviews/review-23.webp",alt:"관리 전후 차이를 확인해 믿음이 갔다는 스칼프잇 고객 리뷰"},
  {image:"/images/reviews/review-24.webp",alt:"관리 중간마다 자세히 설명해줘 만족했다는 스칼프잇 고객 리뷰"},
  {image:"/images/reviews/review-25.webp",alt:"친절한 응대와 시원한 관리가 좋았다는 스칼프잇 고객 리뷰"},
  {image:"/images/reviews/review-26.webp",alt:"두피 열감이 줄어든 것을 느꼈다는 스칼프잇 고객 리뷰"},
  {image:"/images/reviews/review-27.webp",alt:"첫 두피스파에서 깊은 힐링을 경험했다는 스칼프잇 고객 리뷰"},
  {image:"/images/reviews/review-28.webp",alt:"상세한 설명과 비포 애프터 비교가 좋았다는 스칼프잇 고객 리뷰"},
  {image:"/images/reviews/review-29.webp",alt:"관리 후 크게 만족했다는 스칼프잇 고객 리뷰"},
  {image:"/images/reviews/review-30.webp",alt:"상담부터 관리까지 편안했다는 스칼프잇 고객 리뷰"},
  {image:"/images/reviews/review-31.webp",alt:"눈에 띄는 변화를 느껴 꾸준히 관리하고 싶다는 스칼프잇 고객 리뷰"},
];
const marketStats = [
  {value:"1,130",unit:"억 달러",title:"한국 웰니스 경제",desc:"잘 쉬는 경험에 지갑을 여는 시장",connect:"목적 방문"},
  {value:"1,637",unit:"만 명",title:"방한 외래객",desc:"K뷰티를 직접 경험하려는 관광 수요",connect:"신규 유입"},
  {value:"68.3",unit:"%",title:"향수·화장품 구매",desc:"관리 이후 제품으로 이어지는 소비",connect:"추가 매출"},
];
// Booking display is illustrative; replace with the branch's verified booking export.
const bookingPreview={year:2026,month:9,dailyCapacity:20,foreignCustomers:129,totalCustomers:500};
const bookingDays=Array.from({length:30},(_,i)=>({day:i+1,booked:i%5<3?20:17}));
const bookingTotal=bookingDays.reduce((total,day)=>total+day.booked,0);
const bookingCapacity=bookingDays.length*bookingPreview.dailyCapacity;
const bookingOffset=new Date(Date.UTC(bookingPreview.year,bookingPreview.month-1,1)).getUTCDay();
const demandEvidence=[
  {value:"31.7",label:"탈모 증상을 경험했다",detail:"전체 응답자의 경험 응답"},
  {value:"46.9",label:"증상은 없지만 예방에 관심",detail:"현재 증상이 없어도 관심을 보인 응답"},
  {value:"94.8",label:"머리숱은 있을 때 관리해야 한다",detail:"사전 관리 필요성에 동의"},
];
const serviceComparison=[
  ["방문 목적","커트·염색·펌과 함께 받는 추가 관리","두피 관리와 휴식 자체를 위해 예약"],
  ["관리 담당","매장의 시술·인력 운영에 따라 배정","헤드스파 교육을 받은 전담 테라피스트"],
  ["공간","기존 살롱의 샴푸·시술 공간 활용","독립된 관리실에서 받는 케어"],
  ["시간과 구성","헤어 시술에 추가하는 프로그램","상담과 목적별 60~80분 코스"],
];
const glanceEconomics = calculateEconomics(5000);
const glance = [
  {q:"얼마가 필요하죠?",a:"1억·2억·3억·5억, 네 가지 모델.",d:"보증금·권리금·운영자금은 별도입니다. 총예산부터 같이 계산합니다.",href:"#models",cta:"예산별 모델 보기"},
  {q:"얼마 남나요?",a:`월매출 5,000만원 가정 시 영업이익 약 ${Math.round(glanceEconomics.profit).toLocaleString("ko-KR")}만원.`,d:`손익분기는 월매출 약 ${Math.round(glanceEconomics.breakEven).toLocaleString("ko-KR")}만원(가정). 직영 실적이 아닌 계산 예시입니다.`,href:"#profit",cta:"내 조건으로 계산"},
  {q:"손님은 누가 데려오죠?",a:"콘텐츠·검색·광고 실무는 본사가 실행합니다.",d:"점주님의 광고 실무 부담이 ZERO. 광고 매체비는 별도입니다.",href:"#marketing",cta:"본사 마케팅 보기"},
  {q:"기술이 없는데요?",a:"오픈 전 4주, 오픈 후 매달 교육.",d:"기술 2주 · 상담 1주 · 운영 1주. 직접 해보며 확인합니다.",href:"#system",cta:"교육 과정 보기"},
  {q:"직원이 갑자기 나가면요?",a:"채용·교육 계획을 본사와 다시 잡습니다.",d:"즉시 대체를 보장하진 않아, 예비 인건비까지 함께 검토합니다.",href:"#system",cta:"대응 방식 보기"},
  {q:"직영점이 진짜 있나요?",a:"동탄 · 천안 · 광교 · 압구정, 직영 4개.",d:"계약 전에 직접 방문해서 공간과 운영을 확인하세요.",href:"#visit",cta:"방문 상담 신청"},
];
const contractSteps = [
  {n:"01",t:"조건 상담",d:"희망 지역·총예산·직접 운영 여부를 확인합니다. 신청은 계약이 아닙니다."},
  {n:"02",t:"직영점 방문",d:"공간, 관리 과정, 점주 역할을 현장에서 확인합니다."},
  {n:"03",t:"정보공개서 검토",d:"가맹금·로열티·계약 조건은 정보공개서와 계약서로 확인합니다. 제공일부터 14일이 지나야 계약과 가맹금 수령이 가능합니다."},
  {n:"04",t:"출점 결정",d:"상권·예산·운영 계획이 맞을 때만 진행합니다. 맞지 않으면 서두르지 않습니다."},
];
const experiences = [["처음 창업합니다","처음 창업"],["뷰티 업종 경력이 있습니다","뷰티 경력 있음"],["기존 매장을 운영 중입니다","매장 운영 중"],["기타","기타"]];
const budgets = ["1억 모델","2억 모델","3억 모델","5억 모델","모델 상담 희망"];

function requestId(){
  if(typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("");
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}

function SalesChart({values, months, title}:{values:number[];months:string[];title:string}){
  const max = 8000;
  return <div className="f-chart">
    <div className="f-chart-head"><strong>{title}</strong><span>시안 수치 · 만원</span></div>
    <div className="f-chart-scroll"><div className="f-bars" role="img" aria-label={`${title}. 가상 데이터. ${months.map((m,i)=>`${m}: ${values[i]}만원`).join(', ')}`} style={{gridTemplateColumns:`repeat(${values.length},1fr)`}}>
      {values.map((value,i)=><div className="f-bar-col" key={`${title}-${i}`} style={{"--sc-bar-order":i} as CSSProperties}><span>{value.toLocaleString()}</span><i style={{height:`${value/max*100}%`}} className={value===Math.max(...values)?"peak":""}/><small>{months[i]}</small></div>)}
    </div></div>
  </div>;
}

function formatPhone(raw:string){const d=raw.replace(/\D/g,"").slice(0,11);if(d.length<4)return d;if(d.length<8)return `${d.slice(0,3)}-${d.slice(3)}`;return `${d.slice(0,3)}-${d.slice(3,d.length-4)}-${d.slice(-4)}`}
function averageSales(values:number[]){return Math.round(values.reduce((a,b)=>a+b,0)/values.length).toLocaleString("ko-KR")}
function reconcileRows(rows:string[][]){return rows.map(row=>{const result=[...row];const sales=Number(row[1].replaceAll(",",""));const count=Number(row[2]);result[4]=(Number(row[3])/count*100).toFixed(1)+"%";result[5]=(sales/count).toFixed(1);result[7]=(count/26).toFixed(1);return result})}

function OperationSheet({store, rows, average, headline}:{store:string;rows:string[][];average:string;headline:string}){
  return <article className="f-sheet">
    <div className="f-sheet-toolbar"><div><i/><i/><i/></div><span>SCALPIT_{store}_OPERATING_REPORT.xlsx</span><b>본사 월간 리포트</b></div>
    <div className="f-sheet-summary"><div><span>기간 평균 매출</span><strong>{average}<small>만원</small></strong></div><p>{headline}</p><em>PREVIEW DATA</em></div>
    <div className="f-sheet-scroll"><table><thead><tr><th>월</th><th>매출(만원)</th><th>이용 건수</th><th>재예약</th><th>재예약률</th><th>객단가</th><th>광고비</th><th>일평균 이용</th></tr></thead><tbody>{rows.map((row,i)=><tr key={`${store}-${row[0]}`} className={i===rows.length-1?"current":""}>{row.map((cell,j)=><td key={`${row[0]}-${j}`}>{cell}{j===5&&<small>만원</small>}{j===6&&<small>만원</small>}{j===7&&<small>건</small>}</td>)}</tr>)}</tbody></table></div>
  </article>
}

function LaunchPopup({open,onClose,onVisit}:{open:boolean;onClose:()=>void;onVisit:()=>void}){
  const visitChosen=useRef(false);
  return <Dialog open={open} onOpenChange={value=>{if(!value)onClose()}}><DialogContent className="f-popup" showCloseButton={false} onCloseAutoFocus={event=>{
    event.preventDefault();
    const visit=visitChosen.current;
    visitChosen.current=false;
    requestAnimationFrame(()=>{
      if(visit){
        document.getElementById("apply")?.scrollIntoView({behavior:"instant"});
        document.querySelector<HTMLInputElement>('#apply input[name="name"]')?.focus({preventScroll:true});
      }else document.querySelector<HTMLElement>(".f-system-head")?.focus({preventScroll:true});
    });
  }}>
      <button className="f-popup-close" onClick={onClose} aria-label="방문 상담 안내 닫기"><X/></button>
      <div className="f-popup-image"><img src="/images/apgujeong-reception.webp" alt="스칼프잇 압구정 직영점 라운지" width="800" height="1200"/><span>SCALPIT · APGUJEONG</span></div>
      <div className="f-popup-copy"><span>직영점 방문 상담</span><DialogTitle>화면으로 본 매장,<br/>직접 확인하세요.</DialogTitle><DialogDescription>공간, 관리 과정, 직원의 움직임.<br/>내가 운영할 수 있을지 현장에서 확인하고 결정하세요.</DialogDescription><ul className="sc-popup-checks"><li>관리실과 고객 동선</li><li>필요 인원과 점주 역할</li><li>내 지역·예산의 출점 조건</li></ul><a href="#apply" onClick={event=>{event.preventDefault();visitChosen.current=true;onVisit();onClose();}}>직영점 방문 상담 신청</a><small>지점과 일정은 상담 후 협의합니다.</small><button onClick={onClose}>지금은 계속 살펴볼게요</button></div>
    </DialogContent></Dialog>;
}

export default function Home(){
  const [menu,setMenu]=useState(false);
  const [showQuickContact,setShowQuickContact]=useState(false);
  const [popup,setPopup]=useState(false);
  const [model,setModel]=useState("모델 상담 희망");
  const [consent,setConsent]=useState(false);
  const [experience,setExperience]=useState("");
  const [phone,setPhone]=useState("");
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  const [error,setError]=useState("");
  const [reference,setReference]=useState("");
  const [activeStore,setActiveStore]=useState(0);
  const id=useRef("");

  useEffect(()=>watchFranchiseJourney(setShowQuickContact,()=>setPopup(true)),[]);
  useEffect(()=>{
    if(!menu)return;
    const closeOnEscape=(event:KeyboardEvent)=>{if(event.key==="Escape"){setMenu(false);document.querySelector<HTMLButtonElement>(".f-menu")?.focus();}};
    const closeOutside=(event:PointerEvent)=>{if(event.target instanceof Element&&!event.target.closest(".f-header"))setMenu(false);};
    document.addEventListener("keydown",closeOnEscape);
    document.addEventListener("pointerdown",closeOutside);
    return()=>{document.removeEventListener("keydown",closeOnEscape);document.removeEventListener("pointerdown",closeOutside);};
  },[menu]);
  function prepareVisit(){const field=document.querySelector<HTMLTextAreaElement>('textarea[name="message"]');if(field&&!field.value)field.value="직영점 방문 상담을 희망합니다.";}
  function closePopup(){try{sessionStorage.setItem("scalpit_launch_seen","1");}catch{}setPopup(false)}
  function chooseModel(value:string){setModel(value);document.getElementById("apply")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setError("");
    if(!consent){setError("개인정보 수집·이용에 동의해 주세요.");return}
    const form=new FormData(e.currentTarget); if(!id.current) id.current=requestId(); setStatus("sending");
    try{
      const response=await fetch("/api/inquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requestId:id.current,name:form.get("name"),phone:phone,region:form.get("region"),model,experience,message:form.get("message"),website:form.get("website"),consent:true})});
      const body:unknown=await response.json();
      const data=(body&&typeof body==="object"?body:{}) as Record<string,unknown>;
      if(!response.ok) throw new Error(typeof data.error==="string"?data.error:"신청을 접수하지 못했습니다.");
      if(typeof data.reference!=="string") throw new Error("접수 결과를 확인하지 못했습니다. 잠시 후 다시 확인해 주세요.");
      setReference(data.reference);setStatus("success");id.current="";
    }catch(err){setStatus("error");setError(err instanceof Error?err.message:"잠시 후 다시 시도해 주세요.")}
  }

  return <div className="f-site f-editorial f-refined" id="top">
    <a className="skip-link" href="#main-content">본문 바로가기</a>
    <ScalpitExperience/>
    <LaunchPopup open={popup} onClose={closePopup} onVisit={prepareVisit}/>
    <header className="f-header"><a className="f-logo" href="#top"><img src="/brand/scalpit-wordmark.jpg" alt="Scálpit"/></a><nav id="sc-primary-navigation" className={menu?"open":""}>{[["results","직영점·실적"],["profit","수익 구조"],["courses","서비스 경험"],["marketing","본사 마케팅"],["system","운영 지원"],["models","창업 예산"]].map(([section,label])=><a key={section} href={`#${section}`} onClick={()=>setMenu(false)}>{label}</a>)}<a className="sc-menu-consult" href="#apply" onClick={()=>setMenu(false)}>내 지역·예산으로 상담</a></nav><a className="f-header-cta" href="#apply">내 지역 출점 확인</a><button className="f-menu" onClick={()=>setMenu(!menu)} aria-label={menu?"메뉴 닫기":"메뉴 열기"} aria-expanded={menu} aria-controls="sc-primary-navigation">{menu?<X/>:<Menu/>}</button></header>

    <main id="main-content">
<section className="f-hero">
        <BrandFilm/>
        <div className="sc-scroll-cue" aria-hidden="true"><span>SCROLL TO DISCOVER</span><i/></div>
        <div className="f-hero-copy"><span className="f-kicker">헤드스파 · 두피관리 프랜차이즈 <i aria-hidden="true">/</i> 가맹 파트너 모집</span><h1 className="f-growth-title"><span className="sc-cover-line"><span>1년 만에,</span></span><span className="sc-cover-line"><span><em>직영 <strong>4</strong>개.</em></span></span></h1><p className="f-growth-question">어떻게 가능했을까요?</p><div className="f-hero-actions"><a href="#apply">1분 가맹 상담 신청 <ArrowUpRight/></a><a href="#why">직영 4개점 보기 <ArrowDown/></a></div><div className="f-hero-edition"><span>DONGTAN · CHEONAN · GWANGGYO · APGUJEONG</span><b>본사가 직접 투자하고, 직접 운영하는 네 개의 매장.</b></div></div>
      </section>

<section className="f-hook-answer" id="why"><div><span>간단합니다.</span><h2>창업은 결국,<br/><em>돈이 남아야 하니까.</em></h2></div><div className="f-hook-logic"><p>매장을 열고, 고객을 모으고, 비용을 관리하는 일.<br/>스칼프잇이 집중한 건 세 가지입니다.</p><ol><li><span>01</span><strong>고객이 결제할 이유.</strong></li><li><span>02</span><strong>본사가 손님을 부르는 일.</strong></li><li><span>03</span><strong>매출과 비용을 함께 보는 운영.</strong></li></ol><a href="#results">직접 운영한 네 매장부터 확인하세요 <ArrowDown/></a></div></section>

<div className="f-brand-facts"><p>본사가 먼저 경험한 창업.</p><div><strong><MotionNumber value={4}/></strong><span>직영 매장 운영</span></div><div><strong>4<small>주</small></strong><span>관리·상담·운영 교육</span></div><div><strong>30</strong><span>가맹 모집 한정</span></div></div>

<section className="sc-glance" id="glance" aria-labelledby="glance-title"><div className="sc-glance-head"><span>가장 많이 묻는 여섯 가지</span><h2 id="glance-title">긴 설명 전에,<br/>먼저 답부터 드립니다.</h2><p>예비 점주님이 상담에서 제일 먼저 묻는 질문입니다. 자세한 근거는 각 항목에서 이어집니다.</p></div><div className="sc-glance-grid">{glance.map((item,i)=><a key={item.q} href={item.href} className="sc-glance-card"><span>0{i+1}</span><h3>{item.q}</h3><strong>{item.a}</strong><p>{item.d}</p><b>{item.cta} <ArrowRight/></b></a>)}</div></section>

<section className="f-results" id="results"><div className="f-section-head"><span>01 / 직접 투자하고 운영한 네 매장</span><h2>가맹점에 맡기기 전에,<br/>우리 돈으로 먼저 해봤습니다.</h2><p>동탄에서 시작해 천안, 광교, 압구정까지.<br/>광고도, 채용도, 고객 응대도 직접 부딪쳤습니다.<br/>점주님과 함께할 운영 기준은 여기서 나왔습니다.</p></div><div className="f-store-selector" aria-label="직영점 선택" style={{"--sc-store-index":activeStore} as CSSProperties}>{stores.map((s,i)=><button key={s.name} aria-pressed={activeStore===i} onClick={()=>setActiveStore(i)}><span>0{i+1}</span>{s.name}<small>{s.area}</small></button>)}</div><article className="f-store-feature" aria-live="polite"><figure key={stores[activeStore].name}><span className="sc-store-serial">0{activeStore+1} / 04</span><img loading="lazy" decoding="async" onLoad={event=>event.currentTarget.classList.add("sc-photo-ready")} src={stores[activeStore].image} alt={`스칼프잇 ${stores[activeStore].name}점 내부`} width="1200" height="800"/><figcaption>SCALPIT {['DONGTAN','CHEONAN','GWANGGYO','APGUJEONG'][activeStore]}</figcaption></figure><div className="f-store-feature-data"><span>직접 운영하는 매장</span><h3>스칼프잇 {stores[activeStore].name}</h3><dl><div><dt>매장 규모</dt><dd>{stores[activeStore].area}</dd></div><div><dt>투자 규모</dt><dd>{stores[activeStore].investment}원</dd></div></dl><div className="f-store-sales"><small>매출 표기 예시 · 가상 수치</small><strong><MotionNumber value={Number(stores[activeStore].sales.replaceAll(",",""))}/><span>만원</span></strong><p>실제 월별 원장 확인 후 교체 예정</p></div><a href="#models">내 예산에 맞는 모델 <ArrowRight/></a></div></article><div className="f-data-room f-records"><div className="f-data-head"><span>월별 운영 자료 · 가상 데이터 시안</span><h3>최고 매출 한 번으로<br/>설명하지 않겠습니다.</h3><p>매출·이용 건수·재예약·객단가.<br/>필요한 숫자를 한 장의 운영표에 모았습니다.</p></div><div className="f-chart-pair"><SalesChart title="동탄 · 2025.08—2026.08" values={dongtan} months={["25.08","09","10","11","12","26.01","02","03","04","05","06","07","08"]}/><SalesChart title="천안 · 2025.12—2026.08" values={cheonan} months={["25.12","26.01","02","03","04","05","06","07","08"]}/></div><details className="f-data-detail"><summary><span>월별 운영 원장 자세히 보기 <small>매출 · 재예약 · 일평균 이용</small></span><ChevronDown/></summary><div className="f-sheet-stack"><OperationSheet store="DONGTAN" rows={reconcileRows(dongtanOps)} average={averageSales(dongtan)} headline="동탄 월별 운영지표 · 시안"/><OperationSheet store="CHEONAN" rows={reconcileRows(cheonanOps)} average={averageSales(cheonan)} headline="천안 월별 운영지표 · 시안"/></div></details><p className="f-prototype-note">그래프와 운영표는 디자인 검토용 가상 데이터입니다. 객단가는 매출÷이용 건수, 일평균은 월 26일 기준이며 실제 지점 원장으로 교체 예정입니다.</p></div><div className="f-booking-proof" id="booking-proof"><div className="f-booking-copy"><span>압구정로데오점 · 예약 현황 구성안</span><h3>매출 다음에는,<br/>예약표를 보세요.</h3><p>고객이 실제로 시간을 예약하는지,<br/>어느 요일에 예약이 몰리는지.<br/>매장의 다음 매출은 예약표에서 시작됩니다.</p><div className="f-booking-foreign"><span>함께 확인할 고객 구성</span><strong>외국인 고객 비중 <b>{(bookingPreview.foreignCustomers/bookingPreview.totalCustomers*100).toFixed(1)}%</b></strong><p>국내 고객과 여행객을 함께 받는 매장.<br/>외국어 메뉴와 예약 안내도 준비합니다.</p></div><small>예약률·외국인 비중은 디자인 검토용 가상 수치입니다.<br/>실제 예약 자료를 확인한 뒤 교체할 영역입니다.</small></div><div className="f-booking-calendar"><div className="f-booking-calendar-head"><div><span>월간 예약 현황 · 시안</span><h4>{bookingPreview.year}. {String(bookingPreview.month).padStart(2,"0")}</h4></div><div><span>가상 예약률</span><strong>{Math.round(bookingTotal/bookingCapacity*100)}<small>%</small></strong></div></div><div className="f-calendar-week" aria-hidden="true">{["일","월","화","수","목","금","토"].map(day=><span key={day}>{day}</span>)}</div><div className="f-calendar-days" role="list" aria-label="2026년 9월 가상 예약 현황">{Array.from({length:bookingOffset},(_,i)=><span key={`blank-${i}`} aria-hidden="true"/>)}{bookingDays.map(day=><div key={day.day} role="listitem" className={day.booked===bookingPreview.dailyCapacity?"full":"available"} aria-label={`9월 ${day.day}일, 총 ${bookingPreview.dailyCapacity}건 중 ${day.booked}건 예약, 가상 수치`}><b>{day.day}</b><small>{day.booked===bookingPreview.dailyCapacity?"마감":`잔여 ${bookingPreview.dailyCapacity-day.booked}`}</small></div>)}</div><div className="f-booking-legend"><span><i/>예약 마감</span><span><i/>잔여 있음</span><small>실제 예약 시스템과 연동되지 않은 시안</small></div><p className="f-booking-method">예약률: {bookingTotal} ÷ {bookingCapacity}개 예약 가능 시간. 외국인 비중: {bookingPreview.foreignCustomers} ÷ {bookingPreview.totalCustomers}명. 두 지표는 각각의 가상 집계 기준입니다.</p></div></div><div className="f-story-link"><span>매출만 보고 결정할 수는 없으니까.</span><a href="#profit">그래서, 얼마가 남을까요? <ArrowDown/></a></div></section>

<RevenueStudio/>

<section className="f-offering" id="courses">
        <div className="f-section-head"><span>03 / 고객이 선택하는 서비스</span><h2>두피 고민에는 집중 관리.<br/>지친 일상에는 깊은 휴식.</h2><p>두피 촬영과 상담으로 상태를 살피고,<br/>고객의 고민과 목적에 맞는 코스를 안내합니다.<br/>60~80분 동안 어떤 관리를 받는지 확인해 보세요.</p></div>
        <div className="f-treatment-film"><video controls playsInline preload="none" poster="/images/apgujeong-ritual.webp" aria-label="스칼프잇 실제 헤드스파 서비스 소개 영상"><source src="/scalpit-headspa.mp4" type="video/mp4"/>영상 재생을 지원하는 브라우저에서 확인해 주세요.</video><div><span>실제 관리 영상</span><h3>글로 설명하는 것보다,<br/>한 번 보는 게 빠릅니다.</h3><p>두피 촬영과 상담부터 관리, 마무리까지. 고객이 경험하는 과정을 실제 영상으로 확인하세요.</p><ol><li><b>01</b>두피 촬영·상담</li><li><b>02</b>상태와 목적에 맞춘 케어</li><li><b>03</b>관리 전후 확인·마무리</li></ol><a href="#customers">어떤 고객이 오는지 보기 <ArrowDown size={17}/></a></div></div>
        <RepeatVisitPlan/>
      </section>

<section className="f-customers" id="customers"><div className="f-customer-intro"><span>04 / 서로 다른 여덟 가지 방문 이유</span><h2>두피 고민이 있는 사람만<br/>고객이 되는 건 아닙니다.</h2><p>관리하러, 쉬러, 함께 경험하러.<br/>찾아오는 이유가 다르면<br/>선택하는 메뉴와 방문 시간도 달라집니다.</p></div><div className="sc-demand-grid">{customerReasons.map((item,i)=><article key={item.n}><figure><img src={`/images/personas/${['hair-concern','scalp-refresh','maternity-rest','color-perm','beauty-vip','after-work','together','kbeauty-traveler'][i]}.webp`} alt={`${item.title}의 방문 상황을 표현한 이미지`} loading="lazy" width="900" height="1125"/><span>{item.n}</span></figure><div><span>{item.signal}</span><h3>{item.title}</h3><p>{item.desc}</p><p className="sc-demand-opportunity">{item.opportunity}</p>{item.n==="02"&&<figure className="f-demand-quote"><blockquote>“요즘 머리가 너무 기름지고 … 두피 상태가 안좋아서 알아본 끝에 첫 방문 드렸는데”</blockquote><figcaption>실제 방문자리뷰 <a href="/images/reviews/review-23.webp" target="_blank" rel="noreferrer">원본 보기 <ArrowUpRight size={14}/></a></figcaption></figure>}{item.n==="06"&&<figure className="f-demand-quote"><blockquote>“두피스파는 처음인데 힐링의 시간이었어요 ㅎㅎㅎ”</blockquote><figcaption>실제 방문자리뷰 <a href="/images/reviews/review-27.webp" target="_blank" rel="noreferrer">원본 보기 <ArrowUpRight size={14}/></a></figcaption></figure>}</div></article>)}</div></section>

<section className="f-reviews" id="reviews"><div className="f-reviews-head"><span>실제 네이버 방문자리뷰</span><h2>고객은 무엇에<br/>만족했을까요?</h2><p>자세한 설명, 관리 전후 확인, 편안한 휴식.<br/>본사의 설명과 실제 후기를 함께 비교해 보세요.</p></div>
        <div className="f-review-marquee" tabIndex={0} role="region" aria-label="실제 고객 리뷰 모음, 좌우로 스크롤"><div className="f-review-track">{reviewHighlights.filter(review=>!review.image.endsWith("review-23.webp")&&!review.image.endsWith("review-27.webp")).map((review,i)=><figure key={review.image}><figcaption>REVIEW {String(i+1).padStart(2,"0")}</figcaption><img src={review.image} alt={review.alt} loading="lazy"/></figure>)}</div></div><p className="f-review-caption">좌우로 넘겨 더 볼 수 있습니다. 실제 후기의 경험과 표현은 원본 이미지 그대로 담았습니다.</p>
      <details className="f-review-drafts"><summary><span>방문 이유별 후기 구성안 <small>데이트·자녀·선물 등 8가지</small></span><ChevronDown/></summary><div className="f-review-example-heading"><div><strong>여덟 가지 방문 이유, 여덟 가지 이야기.</strong><p>후기 디자인 시안 — 아래 8개 카드는 가상 문구이며, 실제 고객 후기로 교체 예정입니다.</p></div><span>좌우로 넘겨보세요 <ArrowRight size={18}/></span></div>
        <div className="f-review-marquee" tabIndex={0} role="region" aria-label="방문 이유별 창작 리뷰 예시, 좌우로 스크롤"><div className="f-review-track f-review-scenarios">
          {reviewScenarios.map((review,i)=><figure key={review.reason} className="f-scenario-card"><figcaption><span>REVIEW {String(i+1).padStart(2,"0")}</span><span>{review.reason}</span></figcaption><div className="f-scenario-art"><div className="f-scenario-paper"><div className="f-review-profile"><span className="f-review-avatar" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="5" fill="currentColor"/><path d="M6 28c0-7 4-10 10-10s10 3 10 10" fill="currentColor"/></svg></span><div><strong>{["주말의 두 사람","수험생 엄마","두피 관리 입문","두피가 예민한 날","퇴근 후 한 시간","엄마를 위한 선물","염색을 즐기는 고객","한국 여행 중"][i]}</strong><span>{review.reason}</span></div></div><p>{review.body}</p><div className="f-review-keywords">{review.tags.map((tag,j)=><small key={tag}><span aria-hidden="true">{j===0?"✦":"♡"}</span> {tag}</small>)}</div></div></div></figure>)}
        </div></div>
        </details><div className="f-review-next"><p>이 고객을 매장으로 데려오는 일.</p><a href="#marketing">본사가 직접 하는 마케팅 <ArrowDown/></a></div></section>

<section className="f-marketing" id="marketing"><div className="f-marketing-intro"><span>05 / 그럼, 손님은 누가 데려옵니까?</span><h2>광고를<br/>도와드리지 않습니다.</h2><strong>직접 다 해드립니다.</strong><p>매장 문을 열고 손님을 기다리는 일.<br/>그 막막함까지 점주님 몫으로 남겨두지 않겠습니다.<br/>콘텐츠 기획, 광고 집행, 검색 노출까지 본사가 실행합니다.</p></div><div className="f-zero"><span>점주님의<br/>광고 실무 부담</span><strong>ZERO</strong><small>본사가 광고 실무를 담당합니다.<br/>광고 집행비는 별도입니다.</small></div>

        <nav className="f-marketing-chapters" aria-label="본사 마케팅 자세히 보기"><a href="#marketing-search"><span>01</span><b>찾으면, 보이게.</b><ArrowDown/></a><a href="#marketing-content"><span>02</span><b>보면, 오고 싶게.</b><ArrowDown/></a><a href="#marketing-booking"><span>03</span><b>관심은, 예약으로.</b><ArrowDown/></a></nav>
<div className="f-ranking" id="marketing-search"><div><span>01 · 고객이 찾는 순간</span><h3>검색하면,<br/><b>스칼프잇이 먼저 나옵니다.</b></h3><p>찾는 순간 발견되어야 예약의 기회가 생깁니다.<br/>동탄·천안·광교·압구정, 지역 검색부터 잡습니다.</p></div><div className="f-rank-table">{[["동탄","동탄 헤드스파"],["천안","천안 헤드스파"],["광교","광교 헤드스파"],["압구정","서울·강남·압구정 11개 키워드"]].map(([region,keyword])=><p key={region}><span><small>{region}</small>{keyword}</span><strong>1위</strong></p>)}<em>조회 시점과 위치·검색 환경에 따라 순위는 달라질 수 있습니다.</em></div></div>
        <div className="f-social" id="marketing-content"><div className="f-social-head"><span>02 · 고객이 찾기 전부터</span><h3>검색하지 않아도,<br/><b>오고 싶게 만듭니다.</b></h3><p>찾는 사람만 기다리지 않습니다. 영상으로 먼저 만나고, 저장하고, 함께 갈 사람에게 보내게 만듭니다.</p></div><div className="f-social-profile"><img loading="lazy" decoding="async" src="/images/scalpit-instagram-profile.png" alt="스칼프잇 인스타그램 팔로워 1.5만 프로필"/><div><span>브랜드 채널</span><strong>1.5만<small>팔로워</small></strong><p>점주님의 첫 매장이지만,<br/>처음 알려지는 브랜드는 아닙니다.</p></div></div><div className="f-reels"><span>화면을 누르면 실제 매장을 미리 볼 수 있습니다</span><div>{branchReels.map((reel,i)=><a key={reel.name} href={reel.link} target="_blank" rel="noreferrer"><img loading="lazy" decoding="async" src={reel.image} alt={`스칼프잇 ${reel.name}점 미리보기`}/><i/><b>0{i+1}</b><span>{reel.name}<small>매장 미리보기</small></span><Play/></a>)}</div></div></div>
        <details className="f-content-library"><summary><span><b>스칼프잇의 실제 콘텐츠 더 보기</b><small>스칼프잇 브랜드 콘텐츠 15편 · Instagram 원본</small></span><ChevronDown/></summary><div>{brandContent.map((reel,i)=><a href={`https://www.instagram.com/reel/${reel}/`} key={reel} target="_blank" rel="noreferrer" aria-label={`스칼프잇 브랜드 콘텐츠 ${i+1} Instagram에서 보기`}><Play aria-hidden="true"/><span>FILM {String(i+1).padStart(2,"0")}</span><ArrowUpRight aria-hidden="true"/></a>)}</div></details>
        <div className="f-funnel" id="marketing-booking"><div className="f-funnel-copy"><span>03 · 조회수에서 끝내지 않습니다</span><h3>조회수가 아니라<br/>예약까지 봅니다.</h3><p>보고 끝났는지, 찾아봤는지, 예약까지 왔는지.<br/>어떤 콘텐츠가 예약으로 이어졌는지 확인하고,<br/>다음 촬영과 광고에 반영합니다.</p><small>오픈 30일 광고 운영표 · 가상 수치로 구성한 예시</small></div><div className="f-funnel-bars f-funnel-metrics">{[["콘텐츠 도달","184,320","100"],["프로필·검색 유입","12,842","72"],["플레이스 상세 진입","4,216","48"],["상담·예약 행동","1,087","28"]].map(([label,value,width],i)=><div key={label}><span>0{i+1} {label}</span><b>{value}</b></div>)}</div><div className="f-marketing-cycle"><strong>보고서로 끝내지 않습니다.</strong><p>콘텐츠별 반응 확인 <ArrowRight/> 예약 경로 점검 <ArrowRight/> 소재·타깃 개선 <ArrowRight/> 다음 집행에 반영</p></div></div>
        <div className="sc-channel-strip"><div><span>검색부터 예약까지, 본사가 맡는 채널</span><a href="https://www.instagram.com/scalpit_global/" target="_blank" rel="noreferrer">글로벌 계정 보기 <ArrowUpRight/></a></div><div className="sc-channel-logos">{marketingChannels.map(channel=><div key={channel.name}><img src={`/brand/channels/${channel.asset.includes(".")?channel.asset:channel.asset+".svg"}`} alt="" width="28" height="28" loading="lazy"/><span>{channel.name}</span></div>)}</div><details className="sc-work-details"><summary>본사가 직접 실행하는 업무 8가지 <ChevronDown/></summary><div className="f-hq-work-list">{marketingWork.map(item=><article key={item.n}><span>{item.n}</span><div><h4>{item.title}</h4><p>{item.desc}</p><small>{item.output}</small></div></article>)}</div><p>상권·예산에 따라 실행 범위와 비용을 안내합니다. 체험·협찬 콘텐츠는 광고 관계를 표시하며, 메타 광고는 인스타그램·페이스북에 노출됩니다.</p></details></div>
      <div className="f-story-link"><span>광고 다음은, 매장을 운영할 준비입니다.</span><a href="#system">그럼, 점주님은 무엇을 준비할까요? <ArrowDown/></a></div></section>

<section className="f-system" id="system"><div className="f-system-head" tabIndex={-1}><span>06 / 그런데, 나는 이 일이 처음인데요</span><h2>미용 경험이 없어도?<br/>저희와 함께라면<br/>충분합니다.</h2><p>처음부터 잘할 필요는 없습니다.<br/>기술, 상담, 운영. 배워야 할 순서가 있습니다.<br/>오픈 전에는 기본을 익히고,<br/>오픈 후에도 본사와 함께 쌓아갑니다.</p></div><OperatingResponsibilities/><div className="f-academy"><div className="f-academy-title"><span>스칼프잇 교육 과정</span><h3>오픈 전 <b>4주.</b><br/>배운 내용을 직접 해보는 시간.</h3></div><div className="f-academy-plan">{academyPlan.map(stage=><article key={stage.week}><div><span>{stage.week}</span><strong>{stage.duration}</strong></div><h4>{stage.title}</h4><p>{stage.lead}</p><ul>{stage.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div><p className="f-academy-note">수료 날짜만 채우는 것이 아니라, 담당 역할을 실제로 수행할 수 있는지 실습에서 확인합니다. 4주는 기본 교육 과정이며, 추가 연습과 전체 개점 일정은 준비도·점포·공사·채용 상황에 따라 달라집니다.</p><div className="f-academy-monthly"><div><span>오픈 이후에도</span><h3>매달 다시 모여,<br/>매장에서 생긴 문제를 풉니다.</h3></div><div><strong>매달 정기 교육</strong><p>점주님이 현장의 질문과 사례를 가져오면,<br/>관리 기술과 상담 과정을 다시 짚습니다.<br/>교육에서 정한 개선점을 매장에 적용합니다.</p><div className="f-academy-topics"><span>관리 기술 복습</span><span>상담·응대 사례</span><span>운영 노하우 공유</span></div></div></div></div><RecoveryPlan/><details className="f-operation-details"><summary><span>계약 이후 오픈까지 준비 순서</span><ChevronDown/></summary><div className="f-owner-plan"><div className="f-90"><div><span>STEP 01</span><b>출점 판정</b><p>예산·상권·운영 계획 검토</p></div><div><span>STEP 02</span><b>매장 설계</b><p>공간·동선·채용 동시 진행</p></div><div><span>STEP 03 · 교육 4주</span><b>아카데미</b><p>이론·실습·상담·고객 응대</p></div><div><span>STEP 04</span><b>사전 예약</b><p>오픈 콘텐츠·광고·플레이스</p></div><div><span>DAY 1—30</span><b>밀착 운영</b><p>예약·매출·재방문 매일 점검</p></div></div></div><p className="f-caption">준비 일정은 점포 확보, 공사와 채용 상황에 따라 조정됩니다.</p></details><div className="f-experience-credit"><span>200+</span><div><strong>“업종은 달라도, 가맹점이 돈을 버는 시스템은 같습니다.”</strong><p>밥풀릭스·커플릭스·화춘가든·피르메스 등 다양한 브랜드를 운영하며 쌓은 200호점 이상의 오픈 경험.</p></div></div></section>

<section className="f-doubts" id="why-scalpit"><div className="f-doubts-heading"><span>창업을 결정하기 전에</span><h2>망설이는 이유,<br/>저희가 먼저 답합니다.</h2></div><article className="f-doubt-row"><div className="f-doubt-question"><span>01</span><h3>헤드스파,<br/>잠깐 유행 아닐까요?</h3></div><div className="f-doubt-answer"><h4>유행보다 먼저 볼 건,<br/>고객이 계속 신경 쓰는 고민입니다.</h4><p>지금 두피와 모발이 고민인 사람, 문제가 생기기 전에 챙기려는 사람.<br/>스칼프잇은 이들이 상태를 상담하고 관리받을 수 있는 서비스를 만듭니다.</p><div className="f-demand-evidence">{demandEvidence.map(item=><div key={item.label}><strong>{item.value}<small>%</small></strong><h5>{item.label}</h5><p>{item.detail}</p></div>)}</div><div className="f-evidence-source"><a href="https://www.trendmonitor.co.kr/tmweb/trend/allTrend/detail.do?bIdx=3236&code=0502&trendType=CKOREA" target="_blank" rel="noreferrer">엠브레인 트렌드모니터 · 2025 헤어 관리 및 탈모 인식 조사 <ArrowUpRight/></a><p>2025.03.12~17 · 전국 만 19~59세 남녀 1,000명. 조사 응답 비율이며 국내 탈모 인구나 헤드스파 이용률을 뜻하지 않습니다.</p></div><p className="f-doubt-takeaway">관리 관심이 곧 매출은 아닙니다. 그래서 목적에 맞는 메뉴, 예약 유입, 다시 찾을 관리 경험까지 함께 준비합니다.</p><details className="f-market-details"><summary><span>웰니스·관광·뷰티 시장 자료도 함께 보기</span><ChevronDown/></summary><div className="f-market"><div><span>국내 시장 참고자료</span><h3>두피 관리와 만나는<br/>인접 시장의 소비 흐름.</h3><p>탈모 고객은 반복 방문으로, 웰니스 고객은 목적 방문으로, 관광객은 신규 유입으로, K뷰티 고객은 제품 구매로 연결합니다. 각 수요와 매출의 연결 가능성을 살펴보는 참고자료입니다.</p></div><div className="f-market-stats">{marketStats.map(stat=><article key={stat.title}><strong>{stat.value}<small>{stat.unit}</small></strong><h3>{stat.title}</h3><p>{stat.desc}</p><b>SCALPIT → {stat.connect}</b></article>)}</div><div className="f-market-links"><a href="https://www.trendmonitor.co.kr/tmweb/trend/allTrend/detail.do?bIdx=3236&code=0502&trendType=CKOREA" target="_blank" rel="noreferrer">탈모 인식 조사 <ArrowUpRight/></a><a href="https://globalwellnessinstitute.org/press-room/press-releases/gwi-country-rankings-jan2024/" target="_blank" rel="noreferrer">웰니스 통계 <ArrowUpRight/></a><a href="https://www.kcti.re.kr/web/board/boardContentsView.do?board_id=14&contents_id=969e40a59b534173bb2911c714ae929d" target="_blank" rel="noreferrer">외래관광객 조사 <ArrowUpRight/></a><p>각 통계는 헤드스파 단일 시장 규모나 예상 매출을 뜻하지 않으며, 스칼프잇이 연결하는 인접 소비 수요를 보여주는 참고자료입니다.</p></div></div></details></div></article><article className="f-doubt-row"><div className="f-doubt-question"><span>02</span><h3>미용실에서도<br/>헤드스파 하잖아요?</h3></div><div className="f-doubt-answer"><h4>고객이 그 관리를 받으러<br/>일부러 찾아오게 만듭니다.</h4><p>헤어 시술을 하면서 추가하는 관리와, 헤드스파 자체를 예약하는 방문.<br/>스칼프잇은 메뉴와 공간, 전담 인력을 그 방문에 맞춰 준비합니다.</p><div className="f-comparison-scroll"><table className="f-service-comparison"><caption>헤어 시술에 추가하는 관리와 스칼프잇의 운영 방식 비교</caption><thead><tr><th scope="col">비교 기준</th><th scope="col">헤어 시술에 추가하는 관리</th><th scope="col">스칼프잇</th></tr></thead><tbody>{serviceComparison.map(([label,other,scalpit])=><tr key={label}><th scope="row">{label}</th><td>{other}</td><td>{scalpit}</td></tr>)}</tbody></table></div><p className="f-doubt-note">운영 방식의 차이를 설명하는 비교입니다. 미용실마다 별도 전문 프로그램·전담 인력·독립 공간이 있을 수 있습니다. 스칼프잇도 지점과 코스에 따라 구성이 달라집니다.</p></div></article><article className="f-doubt-row"><div className="f-doubt-question"><span>03</span><h3>비슷한 브랜드도<br/>많지 않나요?</h3></div><div className="f-doubt-answer"><h4>비교는 사진으로 끝내지 마세요.<br/>실제 운영을 확인하세요.</h4><div className="sc-compare-check"><a href="#marketing-content">실제로 만든 콘텐츠와 운영 채널 확인</a><a href="#system">4주 교육과 본사·점주의 업무 분담 확인</a><a href="#reviews">고객이 직접 남긴 리뷰 원본 확인</a></div><p>가맹비를 내고 가져오는 것이 간판뿐이어서는 안 됩니다.<br/>직접 만든 콘텐츠, 직원 교육 과정, 매장 운영 방식.<br/>혼자 준비할 때와 무엇이 달라지는지, 이 세 가지를 비교해 보세요.</p><a className="f-doubt-visit" href="#visit">직영점에서 직접 확인하세요 <ArrowRight/></a></div></article></section>

<section className="f-models" id="models"><div className="f-section-head"><span>07 / 이제, 내 조건으로 계산할 차례</span><h2>내 예산으로,<br/>어디까지 가능할까요?</h2><p>1억·2억·3억·5억.<br/>같은 돈이라도 상권과 규모에 따라 출발이 달라집니다.<br/>점포를 계약하기 전에 예산부터 함께 확인하세요.</p></div><div className="f-model-grid">{[
        ["1억","1억 모델","컴팩트 모델","작게 시작해 빠르게 운영에 집중하는 모델","동탄형 운영 구조 참고"],["2억","2억 모델","스탠더드 모델","매출과 투자 효율의 균형을 잡는 대표 모델","천안형 운영 구조 참고"],["3억","3억 모델","플래그십 모델","공간 경험과 지역 내 브랜드 우위를 만드는 모델","광교형 운영 구조 참고"],["5억","5억 모델","시그니처 모델","상권을 대표하는 규모와 브랜드 경험을 만드는 모델","압구정형 운영 구조 참고"]
      ].map(([price,value,name,desc,ref],i)=><article key={price} className={i===1?"featured":""}><span>{i===1?"STANDARD":`MODEL 0${i+1}`}</span><strong>{price}</strong><h3>{name}</h3><p>{desc}</p><small>{ref}</small><button onClick={()=>chooseModel(value)}>이 모델로 상담 <ArrowRight/></button></article>)}</div><p className="f-caption">모델 금액은 상담 기준입니다. 보증금·권리금·부가세·추가 공사·운영자금 등은 지역과 공간에 따라 달라집니다.</p><CapitalChecklist/><div className="f-budget-consult"><div><span>점포 계약 전 확인</span><h3>점포부터 계약하지 마세요.<br/>예산에 맞는 상권부터 봅니다.</h3><p>희망 지역, 준비한 자금, 직접 운영 여부.<br/>세 가지를 확인한 뒤 매장 규모와 오픈 계획을 잡습니다.</p></div><a href="#apply">내 조건으로 출점 검토 <ArrowUpRight/></a></div></section>

<section className="f-limit" id="criteria"><img loading="lazy" decoding="async" src="/images/apgujeong-ritual.webp" alt="스칼프잇 관리 공간"/><div className="f-limit-copy"><span>전국 30개점 · 출점 원칙</span><h2>가맹 모집, 시작합니다.<br/><em>전국 30개점만.</em></h2><p>직영 4곳 다음은, 함께할 30개의 매장입니다. 더 빠르게 시장의 기준이 되기 위해 시작하지만, 출점 숫자에 맞춰 계약하지는 않습니다.</p><strong>자리만 있다고 열지 않습니다.<br/>운영이 가능한 조건부터 확인합니다.</strong><p className="f-selection-promise">조건이 맞지 않으면, 출점을 서두르지 않습니다.<br/>매장 수보다 오래 운영할 수 있는 조건이 먼저입니다.</p><a href="#apply">내 지역·예산으로 출점 검토 <ArrowUpRight/></a></div>
      <div className="f-territory f-selection-board"><div className="f-territory-head"><span>출점 검토 기준</span><b>계약 전 확인하는 4가지</b></div><div className="f-selection-list">{[
        ["01","고객이 있는 상권인가","배후 고객과 방문 동선, 주변 뷰티 업종과 경쟁점을 함께 봅니다."],
        ["02","임대료를 감당할 수 있는가","유동인구만 보지 않습니다. 임대료와 고정비가 운영에 주는 부담을 검토합니다."],
        ["03","운영할 사람과 계획이 있는가","점주의 참여 방식, 필요한 인원과 지역 내 채용 여건을 확인합니다."],
        ["04","오픈 후 버틸 자금이 있는가","공사비만 계산하지 않습니다. 오픈 이후의 인건비·광고비 등 운영자금까지 봅니다."]
      ].map(([n,title,desc])=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div><div className="f-selection-foot sc-fit-note"><strong>경력보다, 직접 챙길 의지가 중요합니다.</strong><p>고객 응대와 직원 관리에 참여하고, 숫자를 기록하며 개선할 분과 함께합니다. 현장 운영을 맡을 사람이나 초기 운영자금이 준비되지 않았다면 그 조건부터 갖춥니다.</p></div>
      <details className="f-region-details"><summary>출점 검토 지역 보기 <ChevronDown/></summary><div className="f-territory-regions" aria-label="전국 출점 검토 지역">{[
        ["01","서울·수도권","압구정 · 광교 · 동탄 운영 중","추가 핵심 상권 검토"],
        ["02","충청권","천안 운영 중","도시별 1호점 검토"],
        ["03","영남권","주요 광역시 우선","상권 분석 후 결정"],
        ["04","호남·강원·제주","관광·생활 상권 구분","지역별 개별 검토"]
      ].map(([n,region,current,next])=><article key={n}><span>{n}</span><div><h3>{region}</h3><p>{current}</p></div><b>{next}</b></article>)}</div></details></div></section>

<section className="f-store-visit" id="visit"><figure><img src="/images/apgujeong-reception.webp" alt="스칼프잇 압구정 직영점 라운지" width="1200" height="800" loading="lazy"/><figcaption>스칼프잇 압구정 직영점</figcaption></figure><div><span>직영점 방문 상담</span><h2>점포 계약 전,<br/>직영점부터 확인하세요.</h2><p>매장 규모, 직원의 움직임, 실제 관리 과정.<br/>내가 운영할 수 있을지 현장에서 확인하세요.<br/>결정은 그다음입니다.</p><ul><li><b>공간</b><span>관리실·상담 공간·고객 동선</span></li><li><b>서비스</b><span>메뉴별 관리 구성과 소요 시간</span></li><li><b>운영</b><span>필요 인원·점주 역할·오픈 준비</span></li></ul><a href="#apply" onClick={prepareVisit}>직영점 방문 상담 신청 <ArrowUpRight/></a><small>문의 내용에 ‘방문 상담 희망’을 남겨주세요. 지점·일정은 사전 협의하며, 관리 체험은 예약 가능 여부와 비용을 별도로 안내합니다.</small></div></section>

<section className="sc-contract" id="contract" aria-labelledby="contract-title"><div className="sc-contract-head"><span>계약 전, 이 순서를 지킵니다</span><h2 id="contract-title">상담받았다고<br/>바로 계약하지 않습니다.</h2><p>가맹 계약은 큰 결정입니다. 서두르는 곳일수록 한 번 더 확인하세요.</p></div><ol className="sc-contract-steps">{contractSteps.map(step=><li key={step.n}><b>{step.n}</b><div><strong>{step.t}</strong><p>{step.d}</p></div></li>)}</ol></section>

<section className="f-faq"><div><span>결정 전에 남는 질문</span><h2>좋은 얘기만 듣고<br/>결정할 수는 없으니까.</h2><p>운영 참여, 채용 공백, 비용.<br/>실제로 시작하기 전에 확인할 질문입니다.</p></div><div>{[
        ["가맹비와 로열티는 얼마인가요?","화면의 손익은 로열티를 매출의 10%로 둔 계산 가정입니다. 가맹금·교육비·로열티 등 확정 조건은 정보공개서와 계약서로 안내하며, 정보공개서를 받은 날부터 14일이 지나야 계약과 가맹금 수령이 가능합니다."],
        ["상담을 신청하면 계속 영업 전화가 오나요?","신청 내용은 가맹 상담 목적으로만 사용합니다. 희망 지역·예산·운영 계획을 확인하는 연락을 드리며, 계약을 서두르지 않습니다. 비교 중이라고 말씀해 주셔도 괜찮습니다."],
        ["다른 일을 하면서 맡겨두고 운영할 수 있나요?","초기 3~6개월은 점주의 현장 참여를 권장합니다. 상주가 어렵다면 매장 운영 책임자를 먼저 정하고, 해당 인건비를 포함해 손익을 다시 계산해야 합니다. 본사 지원만으로 매장이 자동 운영되는 구조는 아닙니다."],
        ["직원이 갑자기 그만두면 어떻게 하나요?","본사와 채용·교육 계획을 다시 잡고, 매장은 현재 인원으로 소화할 수 있는 예약과 근무표를 조정합니다. 신규 채용은 공고만으로 끝나지 않도록 직무 교육까지 연결합니다. 즉시 대체 인력을 보장하는 것은 아니므로 채용 기간과 예비 인건비도 함께 검토합니다."],
        ["광고는 직접 해준다는데, 비용도 무료인가요?","ZERO는 점주님이 직접 광고를 제작하고 집행하는 실무 부담을 말합니다. 광고 매체비·체험 비용 등은 별도로 확인합니다. 손익 계산의 마케팅비 10%는 계산 가정이며, 실제 예산·집행 범위·정기 부담금은 개설 조건에 맞춰 안내합니다."],
        ["화면의 수익이 제 매장에서도 그대로 나오나요?","아닙니다. 수익 계산과 월별 매출·예약 예시는 검토용 가정입니다. 같은 기간의 실제 매출·비용 자료와 비교하고, 내 임대료·인원·운영 참여·대출 조건으로 다시 계산해야 합니다. 높은 매출보다 손익분기점과 초기 운영자금을 먼저 확인하세요."],
        ["교육을 받으면 정말 혼자 할 수 있을까요?","기술 2주, 상담 1주, 운영 1주 동안 담당 업무를 직접 실습합니다. 관리 순서, 고객 응대, 일 마감을 해보며 부족한 부분을 확인합니다. 개점은 교육 날짜뿐 아니라 현장 준비도를 함께 보고 정하며, 이후에도 매달 정기 교육이 이어집니다."],
        ["아직 지역도, 점포도 정하지 않았는데 상담해도 되나요?","가능합니다. 희망 지역과 사용할 수 있는 자금, 직접 운영할 수 있는 정도부터 알려주세요. 후보 점포가 있다면 면적과 임대 조건을 함께 확인합니다. 상담 신청은 가맹 계약이 아니며, 출점 조건을 검토한 뒤 결정합니다."]
      ].map(([q,a])=><details key={q}><summary><span>{q}</span><ChevronDown/></summary><p>{a}</p></details>)}</div></section>

<section className="f-apply" id="apply"><div className="f-apply-copy"><span>지역·예산 검토 / 본점 체험 상담</span><h2>JUST<br/>SCALPIT.</h2><p>내 예산으로 가능한지.<br/>직접 운영할 수 있을지.<br/><strong>상담에서 확인하세요.</strong></p><div className="f-consult-outcomes"><h3>상담은 이 순서로 진행합니다</h3><ol className="f-consult-steps">{[
["01","먼저, 내 조건 확인","희망 지역 · 총예산 · 직접 운영 가능 여부"],
["02","그 조건으로 비용과 운영 검토","필요 인원 · 포함·별도 비용 · 초기 운영자금"],
["03","직영점에서 현장 확인","공간과 관리 과정 · 점주 역할 · 개설 준비 순서"]
].map(([n,title,desc])=><li key={n}><b>{n}</b><div><strong>{title}</strong><p>{desc}</p></div></li>)}</ol></div><div className="f-apply-phone"><Phone/><span>빠른 전화상담</span><a href="tel:01099418870">010-9941-8870</a></div></div><div className="f-form-wrap">{status==="success"?<div className="f-success" role="status"><Check/><span>신청이 접수되었습니다.</span><h3>출점 검토를 위한<br/>첫 단계가 시작됩니다.</h3><p>남겨주신 연락처로 순차적으로 연락드려 희망 지역과 예산을 확인하겠습니다. 직영점 방문은 상담 중 일정을 협의합니다.</p><b>접수번호 {reference}</b></div>:<form onSubmit={submit} className="f-form"><h3>가맹 상담 신청</h3><p className="f-form-intro">비교 중이어도 괜찮습니다. 희망 지역, 준비한 자금, 직접 운영 여부만 생각해 두세요. 점포 계약은 검토 후에 결정합니다.</p><label>이름<input name="name" autoComplete="name" required maxLength={40} placeholder="성함을 입력해 주세요"/></label><label>연락처<input name="phone" type="tel" autoComplete="tel" required maxLength={13} inputMode="numeric" enterKeyHint="next" value={phone} onChange={e=>setPhone(formatPhone(e.target.value))} placeholder="010-0000-0000"/></label><label>희망 지역<input name="region" required maxLength={80} placeholder="예: 서울 송파구 / 지역 미정"/></label><label>관심 창업 모델<Select value={model} onValueChange={setModel}><SelectTrigger className="f-select"><SelectValue/></SelectTrigger><SelectContent>{budgets.map(b=><SelectItem value={b} key={b}>{b==="모델 상담 희망"?"예산 미정 · 상담 후 결정":b}</SelectItem>)}</SelectContent></Select></label><fieldset className="sc-chips"><legend>창업 경험 <small>선택</small></legend><div>{experiences.map(([value,label])=><button type="button" key={value} aria-pressed={experience===value} onClick={()=>setExperience(experience===value?"":value)}>{label}</button>)}</div></fieldset><label>문의 내용<textarea name="message" rows={3} maxLength={1000} placeholder="준비 상황이나 궁금한 점을 적어주세요. 방문 상담을 원하시면 함께 남겨주세요."/></label><div className="f-honey"><input name="website" tabIndex={-1}/></div><div className="f-consent"><Checkbox id="consent" checked={consent} onCheckedChange={v=>setConsent(v===true)}/><label htmlFor="consent">[필수] 가맹 상담을 위한 개인정보 수집·이용에 동의합니다.</label></div>{error&&<p className="f-error" role="alert">{error}</p>}<button type="submit" disabled={status==="sending"}>{status==="sending"?<><LoaderCircle className="spin"/>접수 중</>:<>내 지역·예산으로 출점 검토 <ArrowUpRight/></>}</button><small>신청 후 본사가 연락드려 지역·예산·운영 계획을 확인합니다. 방문 일정은 별도 협의하며, 상담 신청은 가맹 계약이 아닙니다.</small></form>}</div></section>
</main>

    <footer className="f-footer"><img src="/brand/scalpit-wordmark.jpg" alt="Scálpit"/><p>PREMIUM SCALP WELLNESS · FRANCHISE</p><span>압구정 · 광교 · 천안 · 동탄</span><small>© 2026 SCALPIT.</small></footer>
    {showQuickContact&&!menu&&!popup&&<div className="f-floating"><a href="tel:01099418870" aria-label="가맹 전화 상담" title="전화 상담"><Phone/><span>전화</span></a><a href="#apply" aria-label="가맹 상담 신청" title="가맹 상담"><ArrowUpRight/><span>가맹 상담</span></a></div>}
    {showQuickContact&&!menu&&!popup&&<div className="f-mobile-cta"><a href="tel:01099418870"><Phone/>전화 상담</a><a href="#apply">내 지역·예산으로 상담</a></div>}
  </div>;
}
