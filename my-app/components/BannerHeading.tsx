
export default function BannerHeading({heading}) {



    return (
      <>
        <div className="w-full bg-black border-b border-t-foreground/10 p-2 mb-5 flex justify-center text-center">
            <h1>{heading}</h1>
        </div>
      </>

    );
  }
  