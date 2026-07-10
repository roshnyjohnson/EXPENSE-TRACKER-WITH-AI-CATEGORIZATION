export default function AstronautMascot() {
  return (
    <div className='astronaut-mascot' aria-label='Floating astronaut mascot'>
      <svg viewBox='0 0 800 800' className='astronaut-svg' role='img'>
        <defs>
          <linearGradient id='suitGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#FFFFFF' />
            <stop offset='75%' stopColor='#FFFFFF' />
            <stop offset='100%' stopColor='#E1E6F0' />
          </linearGradient>
          <linearGradient id='visorGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#321A3C' />
            <stop offset='40%' stopColor='#20112B' />
            <stop offset='100%' stopColor='#140A1C' />
          </linearGradient>
          <linearGradient id='visorReflect' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#FFFFFF' stopOpacity='0.5' />
            <stop offset='100%' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient id='bagGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#D7A16C' />
            <stop offset='100%' stopColor='#A97343' />
          </linearGradient>
          <linearGradient id='caseGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#9E5330' />
            <stop offset='100%' stopColor='#70341B' />
          </linearGradient>
        </defs>

        <style>{`
          .stroke-main { stroke: #231F20; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; }
          .stroke-thick { stroke: #231F20; stroke-width: 14; stroke-linecap: round; stroke-linejoin: round; }
          .stroke-thin { stroke: #231F20; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
          .fill-suit { fill: url(#suitGrad); }
          .fill-shadow { fill: #D1D9E6; }
          .fill-cash { fill: #41A857; }
          .fill-cash-dark { fill: #2E7D43; }
        `}</style>

        <g id='astronaut-robber'>
          <g id='money-bag'>
            <path d='M 400,380 C 490,360 670,410 670,550 C 670,690 510,720 410,720 C 340,720 300,680 300,600 C 300,500 340,395 400,380 Z' fill='url(#bagGrad)' className='stroke-thick' />
            <path d='M 290,475 C 270,470 200,500 175,520 C 170,535 185,555 195,555 C 215,555 260,525 295,515 Z' fill='#C58E59' className='stroke-main' />
            <path d='M 270,480 C 250,485 220,510 200,535' fill='none' className='stroke-main' />
            <g id='bag-dollar' transform='matrix(0.9, 0.15, -0.15, 0.9, 210, -30)'>
              <path d='M 470,490 C 450,475 420,480 420,505 C 420,535 470,540 470,570 C 470,595 440,605 415,590' fill='none' stroke='#FFFFFF' strokeWidth='16' strokeLinecap='round' />
              <path d='M 442,465 L 442,615' fill='none' stroke='#FFFFFF' strokeWidth='16' strokeLinecap='round' />
            </g>
          </g>

          <g id='left-arm'>
            <path d='M 330,490 C 270,470 230,515 220,550 C 240,580 290,590 325,545' className='fill-suit stroke-main' />
            <path d='M 215,535 C 205,510 245,480 270,490 C 285,497 290,515 275,530 C 260,545 230,550 215,535 Z' className='fill-suit stroke-main' />
            <path d='M 250,495 C 240,510 245,525 255,525' fill='none' className='stroke-thin' />
            <path d='M 232,507 C 228,520 235,532 245,530' fill='none' className='stroke-thin' />
          </g>

          <g id='legs'>
            <path d='M 315,640 L 315,720 C 315,745 410,745 410,720 L 410,640 Z' className='fill-suit stroke-main' />
            <path d='M 410,640 L 410,720 C 410,745 505,745 505,720 L 505,630 Z' className='fill-suit stroke-main' />
            <path d='M 315,715 C 345,725 385,725 410,715' fill='none' className='stroke-main' />
            <path d='M 410,715 C 435,725 480,725 505,715' fill='none' className='stroke-main' />
            <path d='M 410,640 L 410,685' fill='none' className='stroke-main' />
          </g>

          <g id='torso'>
            <path d='M 310,480 C 290,560 300,650 315,660 C 350,670 470,660 505,650 C 510,580 520,510 490,480 Z' className='fill-suit stroke-main' />
            <g id='control-box' transform='translate(335, 535)'>
              <rect width='125' height='75' rx='15' fill='#E1E6F0' className='stroke-main' />
              <rect x='15' y='15' width='45' height='45' rx='8' fill='#FFFFFF' className='stroke-thin' />
              <circle cx='37' cy='37' r='12' fill='#0072BC' className='stroke-thin' />
              <line x1='75' y1='25' x2='110' y2='25' className='stroke-thin' />
              <line x1='75' y1='38' x2='100' y2='38' className='stroke-thin' />
              <line x1='75' y1='50' x2='110' y2='50' className='stroke-thin' />
            </g>
            <path d='M 304,570 C 315,585 335,585 335,585' fill='none' className='stroke-main' />
            <path d='M 460,585 C 460,585 485,585 503,573' fill='none' className='stroke-main' />
          </g>

          <g id='right-arm-and-case'>
            <g id='case-cash-back'>
              <path d='M 455,690 C 440,660 460,650 490,665 Z' className='fill-cash stroke-thin' />
              <path d='M 465,690 C 455,670 470,660 490,673' fill='none' className='stroke-thin' />
              <path d='M 645,695 C 670,670 680,685 655,715 Z' className='fill-cash stroke-thin' />
              <path d='M 645,703 C 662,688 670,698 653,715' fill='none' className='stroke-thin' />
            </g>
            <g id='briefcase'>
              <rect x='480' y='690' width='180' height='115' rx='12' fill='url(#caseGrad)' className='stroke-main' />
              <path d='M 480,715 L 660,715' fill='none' className='stroke-main' />
              <path d='M 515,690 L 515,805' fill='none' className='stroke-thin' opacity='0.3' />
              <path d='M 625,690 L 625,805' fill='none' className='stroke-thin' opacity='0.3' />
            </g>
            <path d='M 495,485 C 520,510 560,550 545,610 C 535,650 500,670 525,690 C 550,700 595,650 605,620 C 615,580 570,510 540,480' className='fill-suit stroke-main' />
            <path d='M 535,690 C 535,660 595,660 595,690' fill='none' className='stroke-main' />
            <path d='M 525,685 C 540,695 570,695 585,680' fill='none' className='stroke-main' />
          </g>

          <g id='backpack'>
            <path d='M 495,475 C 530,475 585,500 595,540 C 605,580 590,620 575,635' fill='none' className='stroke-thick' />
          </g>

          <g id='helmet' transform='translate(0, -5)'>
            <circle cx='415' cy='335' r='185' className='fill-suit stroke-thick' />
            <path d='M 280,465 C 310,500 510,490 530,455' fill='none' className='stroke-thick' />
            <path d='M 295,480 C 320,512 490,505 515,473' fill='none' className='stroke-main' />
            <ellipse cx='400' cy='335' rx='150' ry='140' fill='#231F20' />
            <ellipse cx='395' cy='335' rx='140' ry='130' fill='url(#visorGrad)' />
            <path d='M 275,310 C 265,360 300,420 345,440 C 300,410 285,350 290,310 Z' fill='url(#visorReflect)' />
            <circle cx='480' cy='315' r='16' fill='#FFFFFF' opacity='0.8' />
            <circle cx='495' cy='350' r='10' fill='#FFFFFF' opacity='0.6' />
            <path d='M 235,320 C 232,280 252,260 262,280 C 270,295 265,340 255,355 C 242,350 236,335 235,320 Z' fill='#E1E6F0' className='stroke-main' />
            <path d='M 565,320 C 568,280 548,260 538,280 C 530,295 535,340 545,355 C 558,350 564,335 565,320 Z' className='fill-suit stroke-main' />
            <ellipse cx='558' cy='320' rx='10' ry='22' fill='#D1D9E6' className='stroke-thin' />
          </g>

          <g id='floating-cash'>
            <g transform='translate(140, 580) rotate(-25)'>
              <path d='M 0,0 C 30,-15 50,10 80,-5 L 70,35 C 40,50 20,25 -10,40 Z' className='fill-cash stroke-main' />
              <path d='M 10,10 C 30,0 45,20 65,10' fill='none' className='stroke-thin' opacity='0.4' />
            </g>
            <g transform='translate(170, 680) rotate(15)'>
              <path d='M 0,0 C 35,15 55,-10 90,5 L 80,45 C 45,30 25,55 -10,40 Z' className='fill-cash stroke-main' />
              <path d='M 15,12 C 40,22 55,2 75,12' fill='none' className='stroke-thin' opacity='0.4' />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
