import RedPackGame from "@/components/redpack/Game";

type Props = {};

const config = {
  size: { width: 996, height: 500 },
  spring: { mass: 10, tension: 1000, friction: 100 },
  stage: { antialias: true, backgroundColor: 0xff0ff0 },
};

export default function RedPackPage({}: Props) {
  //   const app = useMemo(() => {
  //     return new Application<HTMLCanvasElement>({
  //       resolution: Math.max(window.devicePixelRatio, 2),
  //       backgroundColor: 0xffffff,
  //       hello: true,
  //     });
  //   }, []);

  //   function resize() {
  //     const windowWidth = window.innerWidth;
  //     const windowHeight = window.innerHeight;
  //     const minWidth = 375;
  //     const minHeight = 700;

  //     // Calculate renderer and canvas sizes based on current dimensions
  //     const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
  //     const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
  //     const scale = scaleX > scaleY ? scaleX : scaleY;
  //     const width = windowWidth * scale;
  //     const height = windowHeight * scale;

  //     // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
  //     app.renderer.view.style.width = `${windowWidth}px`;
  //     app.renderer.view.style.height = `${windowHeight}px`;
  //     window.scrollTo(0, 0);

  //     // Update renderer  and navigation screens dimensions
  //     app.renderer.resize(width, height);
  //     //   navigation.resize(width, height);
  //   }
  //   //   const blurFilter = useMemo(() => new BlurFilter(4), []);

  //   useEffect(() => {
  //     window.addEventListener("resize", resize);

  //     // Trigger the first resize
  //     resize();
  //   }, []);

  return (
    <div>
      <RedPackGame />
    </div>
  );
}
