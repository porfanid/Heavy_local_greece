import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import Beast01 from './../../assets/BeastiediSatana02.jpg';
import Contact from "../../compoments/ContactForm/contact";
import Donate from "../../compoments/donate/donate";
import Footer from "../../compoments/footer/footer";
import ReadMore from "../../compoments/ReadMore/ReadMore";
const Infliction = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4">Μιλάνο - Τα Θηρία του Σατανά
                    <p className="lead">Ιστορία/Παρελθόν</p>
                    <hr className="bg-dark"></hr>
                </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={Beast01} className="img-fluid w-100 ScentAlbumCover shadow-lg rounded-4"></img>
                    <h4>Πηγες</h4>
                    <p className="lead d-flex justify-content-evenly"> 
                    <a href="https://en.wikipedia.org/wiki/Beasts_of_Satan" className="nav-link">Βικιπαιδεια</a>
                    <a href="https://youtu.be/ZfJzLxv6xx4?si=9oPRKykZrNcUXMgQ" className="nav-link">Youtube</a>
                    <a href="https://metallian.com/infliction.php" className="nav-link">Metallian</a>
                    <a href="https://murderpedia.org/male.S/s/sapone-nicola.htm" className="nav-link">Murderpedia.org</a>
                    <a href="https://en.wikipedia.org/wiki/Beasts_of_Satan" className="nav-link">wiki en</a>



                     </p>
                    <ReadMore />
                </div>
                <div className="col-md-6">
                    <p className="lead">
                    Η ιστορία ξεκινάει τον Ιανουάριο του 1998 από τους δρόμους του Μιλάνου, όπου ένα έφηβο παιδί με το όνομα Fabio Tollis ζει την τυπική μέση ζωή ενός Ιταλού εφήβου. Αρχικά φαίνεται για έναν 16χρονο έφηβο με καλές επιδόσεις στο σχολείο και πάθος για την Death Metal και τον ακραίο ήχο της, όπως πολλοί άλλοι ανεξαρτήτως ηλικίας ανά τον κόσμο. Έχουμε πολλοί άλλωστε βιώσει μια παρόμοια φάση! Το παίξιμο της κιθάρας, τα μακριά μαλλιά και η κατανάλωση μπύρας σε μεταλάδικα, ενόσω η ανυποταξία και η αντισυμβατικότητα κυριαρχούν στα μυαλά μας.

Το σημαντικό γεγονός πήρε μέρος όταν ο Fabio εντάχθηκε στους Infliction ως μπασίστας και παράλληλα τραγουδιστής. Από εκεί η ζωή του έκανε μια στροφή 180 μοιρών. Φωτογραφίες του εμφανίστηκαν σε τοπικά περιοδικά, ενώ η επιτυχία του στις κοπέλες ήταν όση δεν υπήρξε έως τότε για τον ίδιο. Όλα όσα θα ήθελε ένα 16χρονο αγόρι! 
Μέσα από τους Infliction ο Fabio ξεκίνησε ένα δεύτερο project, εξελίσσοντας τόσο το μουσικό του ταλέντο όσο και τον τρόπο ζωής του προς σκοτεινότερα μονοπάτια. Τον επόμενο καιρό η ζωή του θα αποτελείται από αποκρυφιστικές τελετές και παιχνίδια “θάρρους”, περνώντας ταυτόχρονα τα βράδια του στην τοπική και φημισμένη metal Μιλανέζικη παμπ “Midnight”. 

                    </p>
                    <p className="lead">
                    Μια από εκείνες τις νύχτες ο Fabio, βρισκόμενος στο γνωστό του στέκι, τηλεφώνησε στους γονείς του, ζητώντας τους να περάσει το υπόλοιπο της βραδιάς με την συμπρωταγωνίστρια της ιστορίας, την κοπέλα του, την 19χρονη Κιάρα Μαρίνο. Όπως θα ήταν φυσικό οι γονείς του αρνήθηκαν και ζήτησαν από τον γιο τους να επιστρέψει σπίτι, όντας μόλις 16 ενώ η ώρα ήταν περασμένη. Η ώρα κύλησε και το τηλέφωνο δεν ξαναχτύπησε… Κανένα ίχνος ζωής δεν άφησε έκτοτε το ζευγάρι, ωθώντας έτσι στην αναφορά της εξαφάνισης τους στις τοπικές αρχές. Το αρχικό πόρισμα των αρχών ήταν για φυγή των δύο νέων για ερωτικούς λόγους όπως είχε προτείνει και ένας φίλος τους ο Νικόλα Σαπόνε. Ωστόσο ο πατέρας του Fabio, ο Michele Tolis, συνειδητοποιώντας ότι κάτι πήγαινε λάθος δεν πείστηκε και άρχισε την δική του ανεξάρτητη έρευνα, διάρκειας τριών ετών. Ο Michele ταξίδεψε σε όλα τα γνωστά μέταλ φεστιβάλ την επόμενη τριετία, όπως το Wacken και το Hellfest, προσπαθώντας να αποσπάσει πληροφορίες από τον κύκλο της extreme metal, πεπεισμένος ότι ο φόνος του υιού και της κοπέλας του προέκυψαν από την συσχέτισή του με τον κατάλογο των αποκρυφιστικών και σατανιστικών στοιχείων και των ονομάτων των μελών που εμπλέκονταν σε αυτές τις δράσεις, καθώς είναι γνωστό σε όλους, metalheads και μη, ότι στα είδη της death και της black ιδιαιτέρως ο σατανισμός και ο αποκρυφισμός αποτελούν κυρίαρχη θεματική των τραγουδιών των συγκροτημάτων τους. Από το 1998 ως το 2004 ο Tollis έχτισε έναν φάκελο πάνω στις δραστηριότητες και των μπαντών που βρίσκονταν στα τετράδια του γιου του και όταν συνέβη ένας τρίτος φόνος, σίγουρος ότι σχετίζεται με τους δολοφόνους του παιδιού του τον έστειλε στην αστυνομία. Η έρευνα άρχισε να αποφέρει καρπούς φέρνοντας την αστυνομία στην θέση με περαιτέρω έρευνες να ξετυλίξει το κουβάρι και να αποκαλυφθούν οι δολοφόνοι. 
                    </p>
                    <p className="lead">
                    Οι δολοφόνοι ήταν μέλη της Σατανιστικής σέκτας εν ονόματι “Τα Θηρία του Σατανά”, η οποία απαρτιζόταν από τους Andrea Volpe, Nicola Sapone, Paolo Leoni, Mario Maccione, Pietro Guerrieri, Marco Zampollo, Eros Monterosso and Elisabetta Ballarin, 

Όπως ήταν αναμενόμενο έφερε τεράστια κατακραυγή σε ολόκληρη την Ιταλική κοινωνία το γεγονός αυτό ιδιαιτέρως σε συντηρητικούς θρησκευτικούς κύκλους, όπως και από το ίδιο το κράτος του Βατικανού γύρω από την death metal και της black περί κακών επιρροών. Αλλά θα κλείσω το άρθρο λέγοντας ότι η μουσική δεν ευθύνεται αυτό καθαυτό ως μορφή έκφρασης και τέχνης για τις ψυχικές ασθένειες και διαταραχές των καλλιτεχνών και των ακροατών και το πως τις διαχειρίζονται, αυτή την θέση έπειτα από χρόνια ερευνών έχει και η ίδια η κοινότητα ψυχολόγων και ψυχιάτρων καθώς είναι απειροελάχιστες οι ενδείξεις πως η μουσική τέτοιου είδους μπορεί τα καθημερινά παιδιά να τα μετατρέψει σε κτήνη.  

                    </p>
                    <p className="lead">
                    Και για να ενισχύσω αυτό το επιχείρημα παραθέτω επίσης δύο γραμμές από τον frontman των θρυλικών death metallers Deicide Glenn Benton και του Ομότιμου Καθηγητή Κοινωνιολογίας στο πανεπιστήμιο του Stanford στις Η.Π.Α. Donald Roberts γύρω από αυτό το θέμα:

Glenn Benton: “Λέω να μην κατηγορείτε άτομα όπως εμένα και τον (Μέριλιν) Μάνσον καθώς ποτέ δεν είπαμε: Επ πρόκειται να γίνουμε τα πρότυπα ζωής των παιδιών σας. Δεν γίνεται για αυτόν τον λόγο. Πρόκειται (καθαρά) περί ψυχαγωγίας.”

Donald Roberts: “Αυτό που θα μπορούσε κάλλιστα η μουσική να κάνει θα ήταν απλώς να ενισχύει πεποιθήσεις οι οποίες είχαν ήδη ενσταλάξει”. (Ο Donald Roberts για την μέταλ αναφέρει ξεκάθαρα με συμβουλευτικό χαρακτήρα ότι τα καταθλιπτικά παιδιά και εκείνα με ιστορικό βίας θα ήταν καλό να μείνουν μακριά από την death metal ή οποιοδήποτε άλλο υποείδος της extreme). 

                    </p>
                </div>
            </div>
           </div>
        </>
    )
}
export default Infliction;