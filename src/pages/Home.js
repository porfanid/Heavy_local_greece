import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import Mnima from './../assets/Mnima.jpg';
import Kroheim from './../assets/kroheim.jpg';
import Passengers from './../assets/passengers.jpeg';
import spell from './../assets/LiveSpell.jpg';
import Yothiria from "./../assets/chronicles/chronicle-02/yothiria-02.jpg";
import Contact from "../compoments/ContactForm/contact";
import Footer from "../compoments/footer/footer";
import Socials from "../compoments/SocialMedia/socials";
import Carousel from "./../compoments/carousel/carousel";
const Home = () => {
  return (
    <>
      <Navigation />
      <header>

        <div className="container mt-4">
          <div className="row text-center bg-secondary p-3 m-2 shadow-lg">
            <div className="col-md-12">
              <div className="jumbotron jumbotron-fluid">
                <div className="container-fluid">
                  <h1 className="display-4">
                    Welcome to <span className="font-1">Heavy Local</span>{" "}
                  </h1>
                  <p className="lead">
                    Stay brutal and explore the unknown metal news, reviews, and
                    features!
                  </p>
                  <hr className="bg-dark" />
                  <Contact />
                  <Socials />
                  <hr className="bg-dark" />
                  <h5>Help us to grow </h5>
                   <a href="https://www.buymeacoffee.com/tzimasvagg7" className="btn btn-primary w-50">Donate</a>
                  <hr className="bg-dark" />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <Carousel />
            </div>
          </div>
        </div>
        {/**reviews */}
        <hr className="bg-dark" />
        <div className="container">
  <h4>Heavy Local Reviews</h4>
  <div className="row mt-4 text-center">
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Mnima} alt="Dreariness"></img>
        <div className="card-body">
          <h4 className="card-title">Mnima :Band Review</h4>
          <p className="card-text lead">
          Είναι γεγονός πως μετά από δύο χρόνια από το τελευταίο τους full-length, οι Έλληνες noise black metallers Μνήμα (Mnima) επέστρεψαν με μια πολύ δυνατή νέα κυκλοφορία αποτελούμενη από 4 αργά και βασανιστικά κομμάτια. Τα "Καταραμένα Λείψανα" ήρθαν υποσχόμενα να σηκώσουν τις τρίχες στους σβέρκους μας, με τα απόμακρα, θλιμμένα riffs, τον μόνιμο ήχο των ραδιοφωνικών παρασίτων και τα απόκοσμα ουρλιαχτά γεμάτα οδύνη.

Ένα ακόμα αφιέρωμα στους τρόμους και τον μυστικισμό που κρύβει η τελετή της κηδείας, ο πόνος του θανάτου και η ματαιότητα του θνητού κόσμου του ανθρώπου. Εκεί που όλα τελειώνουν εκτός από τη μιζέρια, την αποσύνθεση και την παράνοια. Στο cover που στολίζει το συγκεκριμένο άλμπουμ βλέπουμε δύο χρώματα, μόνο το έντονο κόκκινο μέσα σε κατάμαυρο φόντο. Στα δεξιά του πλαισίου παριστάνεται ο εσταυρωμένος σε μια κατάσταση που προκαλεί απελπισία στα μάτια του θεατή. Μα αυτό που πραγματικά προκαλεί απόγνωση στη ψυχή είναι ο ήχος που συνοδεύεται από το album cover.  </p>
          <a href="/article/mnima-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Kroheim} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Kromheim - Band review</h4>
          <p className="card-text lead">
          Οι Kromheim ξεκίνησαν ως ένα one - man project το 2020 στην Πολωνία, μια χώρα με αξιέπαινη παρουσία στον χώρο της extreme metal, με μπάντες όπως οι Vader και οι Behemoth να έχουν αναδειχθεί και να έχουν αφήσει ανεξίτηλο το σημάδι τους παγκοσμίως. Ιδρυτής τους ήταν ο Mikołaj Popławski (Μικολάι Ποπλιάβσκι) ο οποίος αποφάσισε το 2022 να μετακινηθεί στην Αγγλία όπου θα μετέτρεπε τους Kromheim σε μπάντα με κανονική σύνθεση, στο πλήρωμα από το 2022 θα συμμετείχαν εφεξής οι Duncan Arkley (μπάσο)  και Sot (κιθάρες). Το πρώτο τους έργο θα ήταν το 2020 το EP με όνομα Kromheim, στο οποίο ο Ποπλιάβσκι τα είχε αναλάβει εξ ολοκλήρου όλα μόνος του συνθετικά και ορχηστρικά, το 2022 με την συμμετοχή των Arkley και Sot πλέον θα κυκλοφορούσαν ένα single το The Landing ενώ το 2023 σε μια πλήρως παραγωγική χρονιά θα έβγαζαν στην δημοσιότητα 2 singles (War/ World Reborn) και το πρώτο τους πλήρες album το Journey To Divinity.
          </p>
          <a href="/article/Kromheim_-_Band_review-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Passengers} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Chaos and Charms: “Passengers in Panic”</h4>
          <p className="card-text lead">
          Οι Passengers in Panic, μια εξ Αθηνών Progressive/Folk metal μπάντα, είναι μια ξεχωριστή δύναμη στην Ελληνική underground σκηνή. Αντλώντας στοιχεία από το ευρύ φάσμα της κλασικής μέταλ, τις μελωδίες της παραδοσιακής Ελληνικής μουσική και της πανκοειδούς (sic) hard rock, ο ετερόκλητος ήχος τους αιχμαλωτίζει τους ακροατές από την πρώτη κιόλας συγχορδία.
          </p>
          <a href="/article/Chaos_and_Charm-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <hr className="bg-white"></hr>
    <h3>Ανταποκριση Spellbound x Ushala x Tuber live στα Ιωαννινα </h3>
    <hr className="bg-white"></hr>
      <div className='col-md-6'>
<img src={spell} className="img-fluid"></img>
      </div>

      <div className='col-md-6'>
        <p className="lead">
        Μια πολύ ωραία βραδιά γεμάτη από ενορχηστρώσεις, με Προεξάρχοντες τους μπασίστες όλων των συμμετεχόντων συγκροτημάτων οι οποίοι έδωσαν λαϊκιστί τα πάντα, στους χώρους της stoner, της ψυχεδέλειας και της post που ταξίδεψε κάθε ακροατή από την αρχή ως το τέλος η οποία διοργανώθηκε από την 3P LAB έλαβε μέρος την Κυριακή. Από τους Spellbound ως τους Tuber όλοι έδωσαν τον καλύτερο εαυτό τους στην απόδοση ενώ ο χώρος από θέμα ακουστικής ήταν ικανοποιητικός από την σκηνή ως τα πιο πίσω μέρη του σχεδόν κατάμεστου venue του Πολυχώρου. Πάμε να δούμε ξεχωριστά την κάθε μπάντα! Πριν προχωρήσω ωστόσο σε περαιτέρω ανάλυση ας προσθέσω ότι το live διήρκεσε σχεδόν 4 ώρες, από τις 8 το βράδυ ως κοντά μεσάνυχτα! 
        </p>
        <a className="btn btn-danger" href="/article/live-coreresponse-archive">Read More</a>
      </div>

  </div>
</div>
      </header>
      <section className="live-chornicles">
        <div className="container">
          <h4>Live Chronicles by Daria (ENG)</h4>
          <div className="row text-center mt-4">
            <div className="col-md-6">
              <img src={Yothiria} className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h3>
                Chronicles of the Underworld Vol 2: Yoth Iria's Epic Odyssey at
                Psychosounds Festival
              </h3>
              <a
                href="/Chronicles_of_the_underworld_vol-2_archive"
                className="btn btn-primary"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>
      <hr className="bg-dark"></hr>
      <section className="MetalLegends">
        <div className="container-fluid">
          <div className="row mt-4 text-center">
            <div className="col-md-12 mt-4">
              <h3 className="display-3 mt-5 p-5 text-white">
                Σήμερα Στο Legends
              </h3>
              <p className="lead text-white">
              "Ο Σκοτεινός Μύθος Που κρυβει το ονομα των NightStalker"</p>
              <p className="lead text-white">
              Nightstalker, η εμβληματική μπάντα. Ποιος δεν έχει τύχει να τους ακούσει έστω και για μια φορά; Μια stoner μπάντα με αρκετά χρόνια στο ενεργητικό της και κλασικές συνθέσεις όπως το “Dead Rock Commandos” και το “Children of the Sun”, οι οποίες έχουν την τιμητική τους σε αρκετές Ελληνικές playlist.

Παίρνοντας τα πράγματα από την αρχή, το όνομα Nightstalker προέκυψε από από τα Αμερικανικά ΜΜΕ ως παρατσούκλι για τον κατά συρροή δολοφόνο Ρίτσαρντ Ραμίρεζ (1960-2013) που καταδικάστηκε για 13 δολοφονίες, 5 απόπειρες και 11 βιασμούς.
              </p>
                            <a href="/legends-4-archive" className="btn btn-primary">
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
