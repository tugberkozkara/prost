
export default function About(){
    return(
        <>
      <section className="text-center col col-xl-6 col-lg-8 col-md-8 col-sm-9 col-9 mx-auto">
          <div className="h3 mb-3">What?</div>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="text-start row mb-3">
                  <div className="col-12">
                    <h4>prost</h4>
                    <span>[proːst] </span><b>·</b><i> interjection</i>
                    <br />
                    <p>cheers in German, toast when drinking</p>
                  </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-start text-muted"><b>Prost! is places-to-go app to share pubs, cafés etc.</b></div>
              <p className="text-start text-muted">
                You can find places to go and see their menus. You can create an account and add places to share with others. You can also add tags to your places to make them easier to find.
              </p>
              <p className="text-start text-muted">
                <b>How to add a place?</b>
                <br />
                <b>1.</b> Create an account or login.
                <br />
                <b>2.</b> Click on the <b>Insert</b> button on the navbar.
                <br />
                <b>3.</b> Fill the form which asks name, category, location, tags and menu URL information and then click <b>Submit</b>.
                <br />
                <b>4.</b> That's it!
                <br />
              </p>
              <p className="text-start text-muted">
                <b>Prost!</b> is open sourced on <a target="_blank" rel="noreferrer" className="text-decoration-none" href="https://github.com/tugberkozkara/prost">GitHub</a>.
              </p>
            </div>
          </div>
      </section>
    </>
    )
}