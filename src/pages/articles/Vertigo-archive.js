import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import './articles.css'
import PageWithComments from "../../components/Comments/comment";

const Vertigo = () => {
    return (
        <>
            <Navigation/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-evenly">
                        <h3 className="display-4">Vertigo album:Review
                            <p className="lead">By vlady k</p>

                        </h3>
                    </div>
                    <hr className="bg-dark"></hr>
                    <div className="col-md-6 credits-box">
                        <img src={"/assets/Vertigo.jpg"}
                             className="img-fluid w-100 ScentAlbumCover shadow-lg rounded-4"></img>
                        <p><a
                            href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.facebook.com/PsyanideOfficialBand/&ved=2ahUKEwju3M2ljZCFAxXRBNsEHfWGAd4QFnoECBgQAQ&usg=AOvVaw2oXY98z7DkW2NxF8Youjsf"><i
                            className="bi bi-facebbok"></i></a> <a
                            href="https://www.instagram.com/psyanide_official/"><i className="bi bi-instagram"></i></a>
                            <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://open.spotify.com/artist/1yf9vFWTSHq4jZjNJykZ4f&ved=2ahUKEwju3M2ljZCFAxXRBNsEHfWGAd4QFnoECCIQAQ&usg=AOvVaw05BmjK3PlBOpTNtp9GRnjr"><i
                                className="bi bi-spotify"></i></a> <a
                                href="https://www.youtube.com/@psyanideofficial"><i className="bi bi-youtube"></i></a>
                        </p>
                    </div>

                    <div className="col-md-6">
                        <p className="lead">
                            Τον Γενάρη του 2020 βρισκόμουν παρών σε συναυλία των Suicidal Angels (απλά επικοί) και μαζί
                            τους ως support band βρίσκονταν και οι Θεσσαλονικείς Psyanide. Αυτή ήταν και η πρώτη μου
                            επαφή με την μουσική τους. Μετά την συναυλία το πρώτο πράγμα το οποίο αναζήτησα στο internet
                            ήταν φυσικά το συγκρότημα Psyanide. Η μουσική τους και περισσότερο η ενέργεια που ξεχείλιζε
                            από αυτήν είχαν κατακλύσει την ψυχή μου. Χρειαζόμουν περισσότερο Psyanide.
                            Φυσικά, δεν χρειάζεται να μπω σε λεπτομέρειες λέγοντας ότι άκουσα κατευθείαν το άλμπουμ τους
                            I Declare War (ακούστε το χθες). Από τότε οι Θεσσαλονικείς Melodeath/Groove Metalers
                            κατέχουν θέση ανάμεσα στα αγαπημένα μου -τουλάχιστον ελληνικά- συγκροτήματα.
                            Λίαν προσφάτως εξεπλάγην ευχάριστα μαθαίνοντας για την νέα τους κυκλοφορία υπό τον τίτλο
                            Vertigo. Περιττό να σας πω ότι το έχω ήδη ακούσει αρκετές φορές και ότι η εντύπ- μισό λεπτό.
                            Βιάζομαι χωρίς λόγο.
                            Λοιπόν, το άλμπουμ Vertigo των Psyanide διαρκεί 51 λεπτά και 13 δευτερόλεπτα. Η αλήθεια
                            είναι ότι όσες φορές το άκουσα κατέληξα να ομολογώ «Τελείωσε κιόλας;». Ο δίσκος αποτελείται
                            από δέκα κομμάτια. Ξεκινά με το τραγούδι Vertigo το οποίο δίνει και το όνομα στο άλμπουμ.
                            Έξυπνο και ατμοσφαιρικό intro το οποίο αμέσως διαδέχεται ένα κύμα ενέργειας το οποίο σε
                            ταρακουνάει για τα καλά. Σοφή επιλογή να ξεκινάει ο δίσκος με το συγκεκριμένο κομμάτι. Οι
                            Θεσσαλονικείς από την αρχή δείχνουν πως έχουν μεγάλα κότσια. Οι μελωδίες, τα riffs, οι
                            στίχοι και φυσικά τα φωνητικά σε ταξιδεύουν. Σε ταξιδεύουν σε ένα κόσμο με τα αστέρια από
                            πάνω σου και να ονειρεύεσαι ότι ταξιδεύεις με ταχύτητα φωτός όπως λένε και οι στίχοι.
                            Ο δίσκος συνεχίζει να κινείται με το ίδιο σκληρό ανάλογο ύφος. Το κομμάτι Vertigo το
                            διαδέχεται το εξίσου φαντασμαγορικό Empires Down το οποίο από την αρχή σε εκτοξεύει σε
                            ακτίνα χιλιομέτρων. Το συγκεκριμένο κομμάτι καταφέρνει να περάσει το επαναστατικό του μήνυμα
                            χωρίς όμως να φανεί ιδιαίτερα πολιτικό συνάμα αλλά έμμεσα και ποιητικά. Περιττό να
                            σχολιάσουμε ότι στο τεχνικό κομμάτι παραμένουν τρομεροί
                        </p>
                        <p className="lead">
                            Αμέσως, ακολουθεί το τραγούδι Inertia. Ένα από τα αγαπημένα μου του δίσκου. Οι καθαρές
                            μελωδίες στο intro θέτουν το σκηνικό το οποίο θα ακολουθήσει με μεγάλη δεξιοτεχνία. Με δύο
                            λόγια το συγκεκριμένο κομμάτι διαπραγματεύεται την επιλογή της αδράνειας ή της εξέλιξης σε
                            ένα κόσμο κατεστραμμένο ο οποίος μάλλον είναι ο δικός μας όπως τον ζούμε. From dust to dust,
                            όπως τελειώνει και το τραγούδι. Στο συγκεκριμένο τραγούδι μου αρέσουν οι εναλλαγές
                            συναισθημάτων τα οποία δημιουργούνται μέσω της ίδιας της μουσικής.
                            Χωρίς να χρειάζεται να το κουράσω ιδιαίτερα, ο δίσκος είναι γεμάτος ενέργεια, πολύπλοκα
                            riffs, μελωδίες προερχόμενες από άλλες διαστάσεις. Τα solos και τα breakdowns θα σας φέρουν
                            οδύνες στον σβέρκο σας από το πολύ headbanging. Μιλώντας σοβαρά, είναι απίστευτο πόσο φυσικά
                            σου βγαίνει να κάνεις headbanging και να πάρεις φόρα να κάνεις death wall με τον τοίχο αν
                            είσαι μόνος. Τα φωνητικά είναι απλά άπαιχτα. Σκληρά και «καθαρά» όσο πρέπει. Από πλευράς
                            στίχων τώρα. Η γενική θεματολογία του δίσκου θα μπορούσε να χαρακτηριστεί «επαναστατική»
                            χωρίς να γίνεται απαραίτητα επιθετική. Κρίνει και κατακρίνει όχι μόνο το πολιτικό αλλά και
                            το κοινωνικό κατεστημένο. Αποτελεί μια διαμαρτυρία θα έλεγε κανείς απέναντι στην
                            καθημερινότητα η οποία δείχνει κάθε ημέρα πως η πραγματικότητα δεν μπορεί να γίνει απλώς
                            χειρότερη αλλά ίσως να είναι ήδη απαίσια και κατεστραμμένη και απλώς δεν το καταλαβαίνουμε.
                            Με δυο λόγια αποτελεί μια ποιητικής μορφής κοινωνική φιλοσοφία η οποία μας προτρέπει να
                            αλλάξουμε και να δράσουμε. Να αλλάξουμε τους εαυτούς μας και την κοινωνία μαζί.
                            Ίσως υπεραναλύω την γενική θεματολογία αλλά αυτή είναι η εντύπωση που μου γεννήθηκε. Από την
                            άλλη, αν πιστεύετε ότι υπερβάλλω (πιθανό θα έλεγε κανείς) δεν υπάρχει κάτι καλύτερο από το
                            να ακούσετε τον δίσκο και να διαφωνήσετε μαζί μου και φυσικά να συζητήσουμε το θέμα
                            περεταίρω.
                            Το κομμάτι Oleka, το τελευταίο του δίσκου αποτελεί το μεγαλύτερο σε διάρκεια τραγούδι. Τα
                            τελευταία 7 λεπτά και 8 δευτερόλεπτα του δίσκου, ο χρόνος όπου διαρκεί το συγκεκριμένο
                            κομμάτι δηλαδή, είναι ένα τέλειο κλείσιμο το οποίο μας θυμίζει πόσο απάνθρωποι είναι οι
                            άνθρωποι μεταξύ τους και με τον εαυτό τους. Η μουσική στο κομμάτι πράγματι μετατρέπεται σε
                            πιο σκοτεινή και καταθλιπτική χωρίς ποτέ όμως να χάνει την βαρύτητα της. Ο δίσκος κλείνει με
                            την μουσική να χάνεται σταδιακά στο βάθος… και εκείνη την στιγμή έχεις μείνει άφωνος με το
                            κομμάτι και τότε συνειδητοποιείς ότι τελείωσε και το άλμπουμ και μένεις να κοιτάς την οθόνη
                            και να αναρωτιέσαι τι άκουσες μόλις τώρα.
                            Ίσως αγαπημένο μου κομμάτι του δίσκου να αποτελεί το Fading το οποίο ξεφεύγει από την
                            πολιτική και κοινωνική θεματολογία και περνάει για λίγο στο μεταφυσικό. Οι στίχοι σε
                            μεταφέρουν στους λαβυρίνθους του θανάτου και της Εδέμ. Ο σκληρός ήχος ταιριάζει απόλυτα και
                            για λίγο χάνεις την ψυχή σου από το σώμα σου ακούγοντας το. Ειδικά η εναλλαγή από τις
                            καθαρές μελωδίες και πάλι στο distortion και το overdrive θα σου σηκώσουν κάθε τρίχα στο
                            σώμα σου.
                            Συνοψίζοντας. Άριστη παραγωγή. Η αναμονή για την νέα τους δουλειά άξιζε διότι μας παρέδωσαν
                            ένα εξαιρετικό αποτέλεσμα. Τα δύο video clip τους για τα κομμάτια Vertigo και Future Tense
                            είναι επαγγελματικά γυρισμένα αλλά προσωπικά το Future Tense με κέρδισε λίγο περισσότερο.
                            Επίσης, πολύ καλό κομμάτι το συγκεκριμένο το οποίο μου θύμισε και λίγο μουσική ανάλογη των
                            Lamb of God ή ίσως να είναι ιδέα μου. Θα ήθελα απόψεις επάνω σε αυτό το ζήτημα παρακαλώ.
                            Και κλείνοντας. Δεν μπορώ να πιστέψω πως ένα συγκρότημα με τόσο ταλέντο, δεξιοτεχνία, καλές
                            παραγωγές ότι αυτή την στιγμή δεν αποτελεί ένα από τα κορυφαία στην Ελλάδα και ότι δεν είναι
                            γνωστό στο εξωτερικό. Οι δουλειές τους είναι ανάλογες και ίσως καλύτερες από πολλών ακόμη
                            και στο εξωτερικό. Με όλη μου την καρδιά ευχαριστώ τους Psyanide για την εμπειρία που μου
                            χάρισαν ακούγοντας τον νέο τους δίσκο καθώς αποτελεί όντως εμπειρία αξέχαστη η ακρόασή του.
                            Ελπίζω και εύχομαι στους Θεσσαλονικείς να συνεχίσουν την καλή δουλειά και σύντομα να τους
                            δούμε να λαμβάνουν την θέση η οποία τους αξίζει ανάμεσα στην κοινότητα της Metal.
                            …Και όπως κλείνει και το τραγούδι τους Human Republic: Bring all empires to the ground, Burn
                            it!
                        </p>
                        <PageWithComments/>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Vertigo;