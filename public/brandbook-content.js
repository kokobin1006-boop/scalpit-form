/*
 * Scálpit 브랜드북 · 콘텐츠 파일
 * ------------------------------------------------------------
 * 화면에 나오는 모든 문구·장비·프로토콜은 이 파일 하나에서 수정합니다.
 * (brandbook.html 은 이 데이터를 읽어 그리기만 합니다)
 *
 * 현재 내용은 초안입니다. 실제 장비명, 소요 시간, 권장 주기는 운영 기준으로 교체하세요.
 * 확정되면 meta.draft 를 false 로 바꾸면 화면의 DRAFT 표시가 사라집니다.
 *
 * 규칙
 *  - 프로그램 steps 의 min(분)을 합치면 프로그램 총 소요 시간이 됩니다.
 *  - steps 의 devices 에 넣은 기기 id 로 "기기 → 사용 프로그램" 연결이 자동 계산됩니다.
 *  - kind: 'diag'(진단·상담) | 'device'(기기 케어) | 'hand'(수기 케어)
 *  - 효능 문구는 "관리·케어·도움" 표현을 유지하세요. "치료·발모·완치" 같은 의료적 표현은
 *    표시광고 규제 대상이라 쓰지 않는 것을 권장합니다.
 */
window.BRANDBOOK = {
  meta: {
    draft: true,
    idleSeconds: 150,
  },

  hero: {
    eyebrow: 'Scalp Wellness · Brand Book',
    title: ['머리카락 이전에,', '<em>두피</em>를 봅니다.'],
    lead: '긴장과 피로, 수면과 생활 리듬이 가장 먼저 쌓이는 곳. Scálpit은 두피를 읽고, 그 상태에 맞는 케어를 설계하는 두피 웰니스 브랜드입니다.',
    hint: '아래로 넘기며 천천히 둘러보세요',
  },

  nav: [
    { id: 'brand',    ko: '브랜드',     en: 'Brand' },
    { id: 'journey',  ko: '방문 순서',   en: 'Your Visit' },
    { id: 'programs', ko: '프로그램',    en: 'Programs' },
    { id: 'devices',  ko: '기기',       en: 'Devices' },
    { id: 'finder',   ko: '두피 고민',   en: 'Find Yours' },
    { id: 'care',     ko: '홈케어 · FAQ', en: 'Care' },
  ],

  brand: {
    eyebrow: 'Brand',
    title: '건강한 모발은, 편안한 두피에서 시작됩니다',
    lead: '두피는 매일 가장 오래, 가장 조용히 일하는 곳입니다. 그래서 Scálpit은 모발을 꾸미기 전에 두피의 컨디션부터 확인하고 돌봅니다.',
    principles: [
      {
        en: 'See first',
        ko: '먼저 봅니다',
        text: '방문 전 사전 상담 설문과 방문 후 두피 진단으로 오늘의 상태를 확인합니다. 보이지 않으면 맞출 수 없기 때문입니다.',
      },
      {
        en: 'Made for you',
        ko: '맞춰서 설계합니다',
        text: '같은 두피는 없습니다. 고민, 생활 습관, 모발 이력에 따라 프로그램과 강도, 사용하는 기기를 달리합니다.',
      },
      {
        en: 'Keep going',
        ko: '이어서 돌봅니다',
        text: '한 번의 케어로 끝내지 않습니다. 진단 기록을 비교하고, 권장 주기와 집에서의 루틴까지 함께 안내합니다.',
      },
    ],
  },

  journey: {
    eyebrow: 'Your Visit',
    title: '오늘의 케어는 이렇게 흘러갑니다',
    lead: '도착부터 돌아가시는 길까지, 순서는 같고 강도와 구성은 고객님께 맞춰집니다.',
    steps: [
      { title: '사전 상담 설문',  text: '예약 정보, 시술 이력, 두피 고민을 미리 적어 주신 내용으로 상담을 준비합니다.' },
      { title: '두피 진단',      text: '스코프로 모공, 피지, 각질, 모발 굵기를 확대해 화면으로 함께 확인합니다.' },
      { title: '프로그램 설계',   text: '진단과 설문을 바탕으로 오늘의 프로그램, 강도, 사용할 기기를 정합니다.' },
      { title: '케어',          text: '기기와 테라피스트의 손으로, 설계한 순서대로 진행합니다.' },
      { title: '홈케어 · 다음 방문', text: '진단 사진을 기록하고, 집에서의 루틴과 다음 방문 시기를 안내합니다.' },
    ],
  },

  // 케어 포커스 축 (programs[].focus 의 키)
  focusAxes: [
    { key: 'relax',     label: '이완' },
    { key: 'clean',     label: '청정' },
    { key: 'nutrition', label: '영양' },
    { key: 'soothe',    label: '진정' },
    { key: 'root',      label: '모근 케어' },
  ],

  kinds: {
    diag:   '진단 · 상담',
    device: '기기 케어',
    hand:   '수기 케어',
  },

  programsSection: {
    eyebrow: 'Programs',
    title: '네 가지 프로그램',
    lead: '프로그램을 눌러 어떤 순서로, 어떤 기기로, 얼마 동안 진행되는지 자세히 살펴보세요.',
    labels: {
      time: '소요 시간',
      cycle: '권장 주기',
      forWho: '이런 분께',
      effects: '기대할 수 있는 변화',
      focus: '케어 포커스',
      protocol: '케어 프로토콜',
      devices: '사용하는 기기',
      note: '참고해 주세요',
      minute: '분',
    },
  },

  programs: [
    {
      id: 'headspa',
      en: 'HEAD SPA',
      ko: '헤드스파',
      tagline: '깊은 이완, 맑은 두피',
      summary: '두피와 모발에 깊은 이완과 영양을 전하는 힐링 헤드스파입니다. 하루 동안 쌓인 긴장을 풀고, 두피를 가볍고 맑게 정돈합니다.',
      cycle: '2~4주에 1회',
      focus: { relax: 5, clean: 3, nutrition: 4, soothe: 2, root: 2 },
      forWho: [
        '머리와 목, 어깨가 자주 뻐근한 분',
        '두피가 건조하거나 푸석하게 느껴지는 분',
        '정기적으로 두피 컨디션을 관리하고 싶은 분',
        '중요한 일정 전에 리프레시가 필요한 분',
      ],
      effects: [
        '두피의 긴장이 풀리고 머리가 가벼워지는 느낌',
        '클렌징 후 개운하고 맑게 정돈된 두피',
        '앰플 케어로 촉촉하고 결이 고른 두피 컨디션',
        '충분한 휴식으로 이어지는 깊은 이완감',
      ],
      steps: [
        { name: '두피 진단',        min: 5,  kind: 'diag',   devices: ['scope'],      text: '스코프로 모공, 피지, 각질 상태를 함께 보고 오늘의 강도를 정합니다.' },
        { name: '브러싱 · 이완',     min: 5,  kind: 'hand',   devices: ['manual'],     text: '엉킨 모발을 정리하고, 가벼운 압으로 두피를 풀어 긴장을 낮춥니다.' },
        { name: '온열 스팀',        min: 8,  kind: 'device', devices: ['steamer'],    text: '따뜻한 증기로 두피를 데워 각질과 피지를 부드럽게 만듭니다.' },
        { name: '미세 버블 딥 클렌징', min: 12, kind: 'device', devices: ['bubble'],     text: '미세 버블과 헤드스파 전용 샴푸로 모공 주변 노폐물을 씻어냅니다.' },
        { name: '영양 앰플 케어',    min: 10, kind: 'device', devices: ['ultrasonic'], text: '두피 상태에 맞는 앰플을 초음파로 고르게 펴 바릅니다.' },
        { name: '수기 헤드 마사지',  min: 25, kind: 'hand',   devices: ['manual'],     text: '두피에서 목, 어깨선까지 테라피스트의 손으로 천천히 풀어드립니다.' },
        { name: '쿨링 · 드라이',    min: 5,  kind: 'device', devices: ['cooling'],    text: '시원한 마무리로 열감을 가라앉히고, 두피부터 말려 드립니다.' },
      ],
      note: '케어 후 24시간은 뜨거운 물, 강한 스타일링 제품, 염색·펌을 피해 주세요.',
    },
    {
      id: 'hairloss',
      en: 'HAIR LOSS CARE',
      ko: '탈모 관리',
      tagline: '모근이 자리 잡는 환경을 만듭니다',
      summary: '두피 환경을 정돈하고 모근 주변을 집중 케어하는 전문 관리 프로그램입니다. 진단 기록으로 변화를 비교하며 꾸준히 이어갑니다.',
      cycle: '초기 4~8주는 1~2주에 1회, 이후 3~4주에 1회',
      focus: { relax: 2, clean: 3, nutrition: 4, soothe: 2, root: 5 },
      forWho: [
        '머리 감을 때, 빗을 때 빠지는 모발이 신경 쓰이는 분',
        '모발이 예전보다 가늘어지고 힘이 없다고 느끼는 분',
        '가족력이 있어 미리 관리를 시작하고 싶은 분',
        '변화를 눈으로 확인하며 관리하고 싶은 분',
      ],
      effects: [
        '모공을 막는 피지와 각질이 정리된 두피 환경',
        '모근 주변까지 전달되는 집중 영양 케어',
        '마사지와 광 케어로 따뜻하고 부드러워진 두피',
        '진단 사진으로 확인하는 나의 두피 변화 기록',
      ],
      steps: [
        { name: '정밀 진단',         min: 10, kind: 'diag',   devices: ['scope'],      text: '모공당 모발 수, 모발 굵기, 피지 상태를 확대해 기록합니다. 이 기록이 변화를 비교하는 기준이 됩니다.' },
        { name: '온열 스팀',         min: 8,  kind: 'device', devices: ['steamer'],    text: '두피를 따뜻하게 열어 다음 단계를 준비합니다.' },
        { name: '약식 스케일링 · 클렌징', min: 12, kind: 'device', devices: ['scaler'],     text: '모공을 막는 각질과 피지를 가볍게 정리해 두피 환경을 고르게 만듭니다.' },
        { name: '초음파 앰플 케어',   min: 15, kind: 'device', devices: ['ultrasonic'], text: '고민에 맞춘 앰플을 초음파로 두피 전체에 고르게 전달합니다.' },
        { name: 'LED 광 케어',       min: 12, kind: 'device', devices: ['led'],        text: '저출력 LED 빛을 일정 시간 쬐어 두피 컨디션을 케어합니다.' },
        { name: '수기 순환 마사지',   min: 15, kind: 'hand',   devices: ['manual'],     text: '정수리, 측두부, 후두부 순서로 두피를 밀어 올리듯 풀어 마무리합니다.' },
        { name: '기록 · 홈케어 안내', min: 8,  kind: 'diag',   devices: ['scope'],      text: '오늘의 진단 사진을 저장하고, 집에서의 샴푸와 앰플 루틴, 다음 방문 시기를 안내합니다.' },
      ],
      note: '개인차가 있어 변화를 느끼는 시기는 다릅니다. 급격한 탈모나 통증이 있다면 의료기관 진료를 먼저 권해드립니다.',
    },
    {
      id: 'scaling',
      en: 'SCALP SCALING',
      ko: '두피 스케일링',
      tagline: '쌓인 것을 덜어내는 딥 클렌징',
      summary: '쌓인 피지와 각질을 단계적으로 제거해 두피를 깨끗하게 정화합니다. 모든 두피 케어의 출발점이 되는 프로그램입니다.',
      cycle: '약 4주에 1회',
      focus: { relax: 2, clean: 5, nutrition: 2, soothe: 3, root: 2 },
      forWho: [
        '오후만 되면 두피가 번들거리고 머리가 떡지는 분',
        '비듬이나 하얀 각질이 자주 보이는 분',
        '두피에서 냄새가 신경 쓰이는 분',
        '스타일링 제품을 자주 사용하는 분',
      ],
      effects: [
        '가볍고 시원하게 정돈된 두피',
        '각질과 피지가 정리되어 숨 쉬는 듯한 모공 주변',
        '뿌리가 살아나 한결 가볍게 올라오는 볼륨',
        '이후 앰플·영양 케어의 흡수를 돕는 깨끗한 바탕',
      ],
      steps: [
        { name: '두피 진단',        min: 5,  kind: 'diag',   devices: ['scope'],   text: '각질의 종류와 피지량을 확인해 스케일링 강도를 정합니다.' },
        { name: '각질 연화',        min: 10, kind: 'device', devices: ['steamer'], text: '연화 앰플을 바르고 스팀으로 각질을 충분히 불려 줍니다.' },
        { name: '스케일링',         min: 15, kind: 'device', devices: ['scaler'],  text: '불린 각질과 피지를 두피 구역별로 차근차근 정리합니다.' },
        { name: '미세 버블 클렌징',  min: 10, kind: 'device', devices: ['bubble'],  text: '남은 잔여물을 부드럽게 씻어 냅니다.' },
        { name: '쿨링 진정',        min: 5,  kind: 'device', devices: ['cooling'], text: '스케일링 뒤 달아오른 두피를 시원하게 가라앉힙니다.' },
        { name: '마무리 · 홈케어 안내', min: 5, kind: 'diag',   devices: [],          text: '건조 후 두피를 한 번 더 확인하고, 집에서의 관리법을 안내합니다.' },
      ],
      note: '두피가 붉거나 따가운 상태에서는 스케일링 강도를 낮추거나 다른 프로그램을 권해드립니다.',
    },
    {
      id: 'problem',
      en: 'PROBLEM SCALP CARE',
      ko: '문제성 두피케어',
      tagline: '예민한 두피를 위한 저자극 케어',
      summary: '지루성, 민감성, 염증성 등 예민해진 두피를 낮은 자극으로 집중 케어합니다. 진단 단계에서 두피 상태를 먼저 꼼꼼히 살핍니다.',
      cycle: '안정될 때까지 1~2주에 1회, 이후 월 1회',
      focus: { relax: 3, clean: 3, nutrition: 3, soothe: 5, root: 2 },
      forWho: [
        '가렵거나 따갑고, 두피가 쉽게 붉어지는 분',
        '두피에 열감이 자주 느껴지는 분',
        '뾰루지나 트러블이 반복되는 분',
        '일반 케어가 자극으로 느껴졌던 분',
      ],
      effects: [
        '자극을 줄여 한결 편안해진 두피',
        '쿨링 케어로 가라앉는 열감과 달아오름',
        '진정 앰플로 촉촉하게 안정된 두피 컨디션',
        '내 두피에 맞는 샴푸 횟수와 주의사항 정리',
      ],
      steps: [
        { name: '상태 진단 · 문진',  min: 10, kind: 'diag',   devices: ['scope'],      text: '붉음, 염증, 각질 상태를 확인합니다. 의료기관 진료가 먼저 필요해 보이면 이 단계에서 말씀드립니다.' },
        { name: '저자극 클렌징',     min: 10, kind: 'device', devices: ['bubble'],     text: '자극을 줄인 샴푸와 약한 버블로 두피를 씻어 냅니다.' },
        { name: '진정 앰플 케어',    min: 12, kind: 'device', devices: ['ultrasonic'], text: '진정 앰플을 낮은 강도로 전달합니다.' },
        { name: 'LED 광 케어',      min: 12, kind: 'device', devices: ['led'],        text: '민감한 두피 컨디션 케어에 맞춰 진행합니다.' },
        { name: '쿨링 케어',        min: 8,  kind: 'device', devices: ['cooling'],    text: '열감과 달아오름을 시원하게 가라앉힙니다.' },
        { name: '부드러운 수기 케어', min: 5,  kind: 'hand',   devices: ['manual'],     text: '압을 최소로 줄여 두피 주변만 가볍게 풀어 줍니다.' },
        { name: '홈케어 · 다음 방문', min: 3,  kind: 'diag',   devices: [],             text: '집에서의 샴푸 횟수, 주의할 점, 다음 방문 시기를 정리해 드립니다.' },
      ],
      note: '증상이 심하거나 오래 지속되면 의료기관 진료를 먼저 권해드립니다. 본 케어는 의료행위가 아닙니다.',
    },
  ],

  devicesSection: {
    eyebrow: 'Devices',
    title: '기기는 도구, 마무리는 손',
    lead: '진단하고, 준비하고, 전달하는 일은 기기가 돕습니다. 두피의 반응을 읽고 강도를 정하는 일은 언제나 테라피스트의 몫입니다.',
    labels: { usedIn: '사용 프로그램', feel: '이렇게 느껴져요' },
  },

  devices: [
    {
      id: 'scope',
      en: 'SCALP SCOPE',
      name: '두피 진단 스코프',
      role: '두피를 확대해 눈으로 확인합니다',
      how: '고배율 카메라로 모공, 피지, 각질, 모발 굵기를 화면에 크게 비춥니다. 케어 전후를 같은 부위로 찍어 변화를 기록합니다.',
      feel: '두피에 가볍게 대고 촬영해요. 아프지 않습니다.',
    },
    {
      id: 'steamer',
      en: 'WARM STEAM',
      name: '온열 스팀 미스트',
      role: '두피를 따뜻하게 열어 줍니다',
      how: '따뜻한 미세 증기로 각질과 피지를 부드럽게 하고, 이어지는 클렌징과 앰플 케어를 받아들이기 좋은 상태로 만듭니다.',
      feel: '따뜻한 증기가 머리를 감싸는 포근한 느낌이에요.',
    },
    {
      id: 'bubble',
      en: 'MICRO-BUBBLE',
      name: '미세 버블 샤워',
      role: '모공 주변을 부드럽게 씻어냅니다',
      how: '아주 작은 거품 입자가 두피 표면을 감싸며 노폐물을 씻어냅니다. 문지르지 않아 자극이 적은 클렌징 단계입니다.',
      feel: '보슬보슬한 거품이 닿는 시원하고 개운한 느낌이에요.',
    },
    {
      id: 'scaler',
      en: 'SCALING CLEANSER',
      name: '스케일링 클렌저',
      role: '쌓인 각질과 피지를 정리합니다',
      how: '각질 연화 제품과 함께 사용해, 모공을 막는 피지와 각질을 두피 구역별로 차근차근 덜어냅니다.',
      feel: '가볍게 닿는 감촉이고, 끝나면 두피가 시원해져요.',
    },
    {
      id: 'ultrasonic',
      en: 'ULTRASONIC AMPOULE',
      name: '초음파 앰플 케어',
      role: '앰플이 고르게 퍼지도록 돕습니다',
      how: '초음파 진동으로 앰플이 두피 전체에 고르게 퍼지도록 돕습니다. 두피 상태에 따라 강도와 앰플을 달리합니다.',
      feel: '잔잔한 진동이 느껴지고, 두피가 촉촉해져요.',
    },
    {
      id: 'led',
      en: 'LED LIGHT CARE',
      name: 'LED 광 케어',
      role: '빛으로 두피 컨디션을 케어합니다',
      how: '저출력 LED 빛을 일정 시간 쬡니다. 두피 상태에 맞춰 파장과 시간을 조절해 컨디션 케어에 활용합니다.',
      feel: '은은한 빛과 약간의 온기만 느껴져요. 눈을 감고 쉬시면 됩니다.',
    },
    {
      id: 'cooling',
      en: 'COOLING CARE',
      name: '쿨링 진정 케어',
      role: '달아오른 두피를 시원하게 마무리합니다',
      how: '차가운 공기나 쿨링 팩으로 케어 후 올라온 열감을 가라앉힙니다. 두피가 예민한 날일수록 꼭 거치는 단계입니다.',
      feel: '시원하게 식으면서 머리가 맑아져요.',
    },
    {
      id: 'manual',
      en: 'MANUAL TECHNIQUE',
      name: '수기 두피 마사지',
      role: '두피의 반응을 손으로 읽습니다',
      how: '기기가 환경을 만들면, 테라피스트가 손으로 두피의 긴장도와 반응을 확인하며 압과 속도를 조절합니다.',
      feel: '압이 세거나 약하면 언제든 말씀해 주세요. 바로 맞춰 드려요.',
    },
  ],

  finderSection: {
    eyebrow: 'Find Yours',
    title: '요즘 두피 고민은 무엇인가요?',
    lead: '해당하는 고민을 모두 눌러보세요. 맞는 프로그램을 보여드려요. 최종 구성은 진단 후 상담에서 함께 정합니다.',
    empty: '고민을 선택하면 어울리는 프로그램이 여기에 나타납니다.',
    primary: '가장 잘 맞아요',
    secondary: '함께 고려해요',
    matchLabel: '선택한 고민',
    more: '프로그램 자세히 보기',
    medical: '붉음, 염증, 통증이 심하거나 오래 이어지면 의료기관 진료를 먼저 권해드립니다. 상담 때 꼭 말씀해 주세요.',
  },

  // programs: [가장 잘 맞는 순서대로 프로그램 id]  /  medical: true 면 의료기관 안내 문구 노출
  concerns: [
    { id: 'hairloss', ko: '탈모',        programs: ['hairloss', 'headspa'] },
    { id: 'itch',     ko: '가려움',      programs: ['problem', 'scaling'] },
    { id: 'dry',      ko: '건조',        programs: ['headspa', 'problem'] },
    { id: 'oily',     ko: '지성 · 번들거림', programs: ['scaling', 'headspa'] },
    { id: 'dandruff', ko: '비듬',        programs: ['scaling', 'problem'] },
    { id: 'redness',  ko: '홍반 · 발적',  programs: ['problem'], medical: true },
    { id: 'odor',     ko: '악취',        programs: ['scaling', 'headspa'] },
    { id: 'heat',     ko: '두피 열감',    programs: ['problem', 'headspa'] },
    { id: 'pimple',   ko: '뾰루지 · 염증', programs: ['problem'], medical: true },
    { id: 'pain',     ko: '통증 · 따가움', programs: ['problem'], medical: true },
  ],

  careSection: {
    eyebrow: 'Care',
    title: '집에서도, 이어서',
    lead: '두피 컨디션은 샴푸하는 몇 분에서도 달라집니다. 오늘부터 해볼 수 있는 네 가지입니다.',
    tipsTitle: '홈케어 루틴',
    faqTitle: '자주 묻는 질문',
  },

  homecare: [
    { big: '35–37℃', title: '미온수로',     text: '뜨거운 물은 두피를 건조하게 만들어요. 체온과 비슷한 물로 충분히 적신 뒤 샴푸하세요.' },
    { big: '손끝',    title: '거품부터 내기',     text: '손바닥에서 거품을 낸 뒤 손끝으로 두피를 문질러요. 손톱은 쓰지 않습니다.' },
    { big: '2×',     title: '충분히 헹구기', text: '샴푸한 시간의 두 배로 헹궈 주세요. 남은 잔여물이 가려움의 원인이 되기도 해요.' },
    { big: '두피부터', title: '꼼꼼히 말리기', text: '수건으로 눌러 닦고, 드라이어는 두피부터 찬바람이나 미지근한 바람으로 말려요.' },
  ],

  faq: [
    {
      q: '사전 상담 설문은 꼭 작성해야 하나요?',
      a: '네. 작성해 주신 내용을 바탕으로 상담과 프로그램을 준비합니다. 작성하지 않으시면 상담이 제한될 수 있어요. 2인 이상 예약이시면 일행분도 각자 작성해 주세요.',
    },
    {
      q: '간단 상담과 정밀 진단 상담은 무엇이 다른가요?',
      a: '간단 상담은 고민과 선호를 듣고 바로 케어를 시작합니다. 정밀 진단 상담은 스코프로 두피를 확대 촬영해 상태를 함께 확인한 뒤 프로그램을 설계합니다.',
    },
    {
      q: '케어받는 모습을 촬영해도 되나요?',
      a: '원하시면 고객님의 휴대폰으로 사진과 영상을 촬영해 드립니다. 사전 설문에서 선택하시거나, 직원에게 편하게 말씀해 주세요.',
    },
    {
      q: '염색이나 펌을 한 지 얼마 안 됐어요.',
      a: '상담 때 꼭 알려주세요. 염색·펌 직후의 두피는 예민할 수 있어, 스케일링이나 강한 마사지는 강도를 낮추거나 시기를 조절합니다.',
    },
    {
      q: '두피에 염증이나 상처가 있어도 받을 수 있나요?',
      a: '상태가 심하거나 통증이 있으면 의료기관 진료를 먼저 권해드립니다. 가벼운 민감성이라면 문제성 두피케어로 저자극 진행이 가능합니다.',
    },
    {
      q: '효과는 얼마나 지속되나요?',
      a: '두피 상태, 생활 습관, 모발 이력에 따라 달라요. 그래서 진단 기록을 남기고, 고객님께 맞는 권장 주기를 안내해 드립니다.',
    },
  ],

  footer: {
    tagline: 'Head Spa & Scalp Care',
    disclaimer: 'Scálpit의 프로그램은 의료행위가 아닌 두피·모발 관리 서비스입니다. 효과와 변화에는 개인차가 있으며, 염증·통증·급격한 탈모 등 질환이 의심되면 의료기관 진료를 먼저 권해드립니다.',
  },

  ui: {
    draftBanner: 'DRAFT · 장비명, 소요 시간, 권장 주기는 실제 운영 기준 확인 후 확정됩니다',
    toTop: '처음으로',
    stepsLabel: '단계',
  },
};
