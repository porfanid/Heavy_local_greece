import React from "react";
import Navigation from "./../../compoments/Navigation/Navigation"; // Corrected path
import './articles.css';
import TortugaImage from './../../assets/tortuga.jpg'; // Corrected import
import Tortuga02Image from './../../assets/tortuga02.jpg'; // Corrected import
import Tortuga03Image from './../../assets/tortugal-03.jpg'; // Corrected import

import ReadMore from "./../../compoments/ReadMore/ReadMore"; // Corrected path
import PageWithComments from "../../compoments/Comments/comment";

const Tortuga = () => {
    return (
        <>
            <Navigation />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-evenly">
                        <h3 className="display-4">
                        Tortugal Sacrifice: The Many Faces Of Death                            
                        <hr className="bg-dark" />
                            <h4>Review</h4>
                            <p className="lead">από τον Vladu K. </p>
                        </h3>
                    </div>
                    <hr className="bg-dark" />
                    <div className="col-md-6 credits-box">
                        <img src={TortugaImage} className="img-fluid ScentAlbumCover shadow-lg rounded-4" alt="Tortuga" />

                        <p className="lead text-center">Βρες τους Tortugal Sacrifice <a href="instagram.com/p/CnC6A2mDxaQ"><i className="bi bi-instagram"></i></a> <a href="facebook.com/profile.php?id=100092612064230&mibextid=LQQJ4d"><i className="bi bi-facebook"></i></a><a href="open.spotify.com/artist/0S7dWvdDI9CGrmaBalhHtd"><i className="bi bi-spotify"></i></a><a href="https://www.youtube.com/@tortugalsacrifice/videos"><i className="bi bi-youtube"></i></a> </p>
                    </div>
                    <div className="col-md-6">
                        <p className="lead">
                        Όλα ξεκίνησαν όταν τις προάλλες μου έστειλε μήνυμα ο συνμεταλλάς αδερφός Μιχάλης (See: Μιχάλης Αντωνόπουλος: Reka: Το διεθνές ατμοσφαιρικό δυστοπικό “Ποτάμι” της Ρωσίας) και με ρώτησε αν θα ήθελα να γράψω κριτική για μικρές μπάντες εγχώριες και εξωτερικού. Αρχικά, ήμουν σκεπτικός λόγω πιεσμένου χρόνου αλλά αμέσως του είπα να μου στείλει σύνδεσμο να ακούσω και να γράψω έστω και δοκιμαστικά. Όπως είπα και στον ίδιο, τον τελευταίο καιρό είχα καιρό να ακούσω νέα μουσική και μου φάνηκε πρώτης τάξεως ευκαιρία να ακούσω νέες Underground παραγωγές.
	Και κάπως έτσι ξεκινά και η ένταξή μου στο περιοδικό Heavy Local. Αλλά ας αφήσουμε στην άκρη αυτές τις λεπτομέρειες και πάμε κατευθείαν στο ψητό. Λίγες ώρες αργότερα, τα ξημερώματα με βρήκαν να ακούω το άλμπουμ The Many Faces Of Death του 2022 των νεαρών Brutal Death Metallers Καναδών Tortugal Sacrifice ύστερα από μια ταινία θρίλερ που είχα παρακολουθήσει τα μεσάνυχτα.
	Το άλμπουμ ξεκινά με το instrumental κομμάτι Deadly Prerequisite το οποίο διαρκεί 55 δευτερόλεπτα. Με ένα πρώτο άκουσμα δεν λέει και πολλά αλλά αποτελεί μια έξυπνη κίνηση ατμοσφαιρικότητας για την σκληράδα που θα ακολουθήσει αμέσως.
                        </p>
                        <p className="text-center">
                            <img src={Tortuga02Image} className="img-fluid W-100 shadow-lg rounded-4" alt="Tortuga02" />
                        </p>
                        <p className="lead">
                        Από εκεί και πέρα δεν χρειάζεται να αναλύσουμε κάθε κομμάτι ξεχωριστά για λόγους οι οποίοι εξηγούνται μέσω ακρόασης. Δηλαδή, με δυο λόγια όπως λέει και ο ίδιος ο τίτλος του δίσκου, η θεματολογία αφορά τα πολλά ιδιαίτερα προσωπεία του θανάτου. Ορισμένες φορές ο τίτλος του εκάστοτε κομματιού ίσως παραπέμψει σε άλλα θέματα αλλά σύντομα καταλαβαίνει κανείς ότι η θεματολογία παραμένει γύρω από το θάνατο. 
Μουσικά μιλώντας, η brutal ενέργεια ακούγεται δυνατά σε κάθε κομμάτι αν και κάποιος φανατικός του είδους ίσως να έλεγε πως θα μπορούσε να είναι και πιο σκληρή η μουσική. Βλέπουμε ορισμένες προσπάθειες για metal breakdown εδώ και εκεί και ορισμένα riff τα οποία μένουν στο αυτί και σε οδηγούν και σε banging. Αλλά, -λόγω του νεαρού της ηλικίας θέλω να πιστεύω- αρκετές μελωδίες και ρυθμοί μοιάζουν μεταξύ τους και εύκολα αντιλαμβάνεται κανείς τις επιδράσεις.   
Στιχουργικά, παραμένουν προσηλωμένοι σε μεγάλο βαθμό στο πως βιώνει ο καθένας ατομικά τον θάνατο αλλά και τον φόβο που προκαλείται από αυτόν λόγω άλλων ατόμων τα οποία κοσμούνται με «όμορφα κοσμητικά επίθετα» (προφανέστατα για το είδος).    
Αν έπρεπε να διαλέξω αγαπημένο κομμάτι από το άλμπουμ αυτό θα ήταν το What My Life Is Worth. Έξυπνο intro. Δημιουργικοί στίχοι. Σκληρή μουσική ενέργεια και τέλος ένα άριστο τελευταίο κομμάτι για τον δίσκο.
Κλείνοντας και αφήνοντας ένα feedback: Αποφάσισα να μην είμαι ιδιαίτερα σκληρός. Μια αξιόλογη πρώτη προσπάθεια. Επιρροές όπως οι Cannibal Corpse (φυσικά) για παράδειγμα είναι εύκολα αντιληπτές. Όπως είπα δεν θα είμαι σκληρός και αυτό διότι αποτελεί την πρώτη σοβαρή δουλειά των νεαρών Καναδών.
                        </p>
                        <img src={Tortuga03Image} className="img-fluid W-100 shadow-lg rounded-4" alt="Tortuga02" />

                        <p className="lead">
                        Βλέπω προοπτικές για το μέλλον και αυτός ο δίσκος αποτελεί μια υπόσχεση για πρόοδο. Αν θα έπρεπε να σχολιάσω σύμφωνα με την προσωπική μου οπτική θα έλεγα πως οι νεαροί δεν έχουν ωριμάσει καλλιτεχνικά ακόμα αλλά αυτό φυσικά δεν θα πρέπει να τους σταματήσει αλλά το αντίθετο. Με δυο λόγια θέλω να πω ότι θα πρέπει να αναζητήσουν έναν πιο μοναδικό ήχο που θα τους κάνει να ξεχωρίσουν. 
Και στιχουργικά ίσως θα πρέπει να ψάξουν μια πιο δημιουργική διέξοδο. Θα μου πείτε, «Αδερφέ, Brutal Death Metal είναι, τι περιμένεις; Για gore και trauma θα ακούσεις». Και θα απαντήσω φυσικά, αρκεί να μην είναι μονοδιάστατη η θεματολογία διότι καταλήγει τουλάχιστον ανιαρό το δημιούργημα. Και το κομμάτι What My Life Is Worth αποδεικνύει πως οι Καναδοί μπορούν να διερευνήσουν και άλλες στιχουργικές οδούς χωρίς να ξεμακραίνουν από την σκληράδα του είδους.  
Ελπίζω να δούμε πρόοδο στις επόμενες παραγωγές των Tortugal Sacrifice και ας ευχηθούμε στα παιδιά καλή τύχη.
Εδώ θα ευχαριστήσω την ομάδα του Heavy Local και τον Μιχάλη για την πρόταση που μου έκαναν και που με δέχθηκαν στην ομάδα τους. Το εκτιμώ ιδιαίτερα και θα βάλω τα δυνατά μου να μην σας απογοητεύσω. Και φυσικά, θα συνεχίσουμε να rockάρουμε δυνατά και με τους αναγνώστες. 
                        </p>

                        <PageWithComments />

                    </div>
                    <ReadMore />
                </div>
            </div>
        </>
    );
};

export default Tortuga;
