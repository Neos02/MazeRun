const firebaseConfig = {
  apiKey: "AIzaSyBsgn_Z45DnRl-wQAsCejBKyoYHEn9ODBI",
  authDomain: "maze-run-e8256.firebaseapp.com",
  projectId: "maze-run-e8256",
  storageBucket: "maze-run-e8256.appspot.com",
  messagingSenderId: "875753252540",
  appId: "1:875753252540:web:c60fafe132008c06ee12b9",
  measurementId: "G-798B0EFZLR",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();

function getLeaderboard() {
  firestore
    .collection("scores")
    .orderBy("milliseconds", "desc")
    .limit(10)
    .get()
    .then((querySnapshot) => {
      const scoreElements = document.getElementsByClassName("score");
      const scores = [];

      querySnapshot.forEach((doc) => {
        scores.push(doc.data());
      });

      for (let i = 0; i < scoreElements.length; i++) {
        if (i >= scores.length) {
          break;
        }

        scoreElements[i].innerHTML = "";

        const name = document.createElement("span");
        name.innerText = scores[i].name;
        scoreElements[i].appendChild(name);

        const time = document.createElement("span");
        time.innerText = formatMillis(scores[i].milliseconds);
        scoreElements[i].appendChild(time);

        const health = document.createElement("span");
        health.innerText = `${scores[i].health} / ${PLAYER_MAX_HEALTH}`;
        scoreElements[i].appendChild(health);
      }
    })
    .catch(console.log);
}

function addScore(name, difficulty, health, milliseconds) {
  firestore.collection("scores").add({
    name,
    difficulty,
    health,
    milliseconds,
  });
}
