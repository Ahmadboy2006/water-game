let lettersGroup = document.querySelector(".group-letters");
let dishesGroup = document.querySelector(".group-dishes");
let start = document.querySelector(".startt-btn");
let dishArr = Array.from(document.querySelectorAll(".dish"));
let miniDishArr = Array.from(document.querySelectorAll(".mini-dish"));
const easyBtn = document.querySelector(".easy-btn");
const normalBtn = document.querySelector(".normal-btn");
const hardBtn = document.querySelector(".hard-btn");
let son = 0;
let level;
let settings = document.querySelector(".settings-btn");
const regBtn = document.querySelector(".reg-btn");
const logBtn = document.querySelector(".log-btn");
const regLogInp = document.querySelector(".reg-log-inp");
const regPassInp = document.querySelector(".reg-pass-inp");
const regPassInp1 = document.querySelector(".reg-pass-inp1");
const logLogInp = document.querySelector(".log-log-inp");
const logPassInp = document.querySelector(".log-pass-inp");
let speed = Array.from(document.querySelector(".level").children)
let inpIndex = 0;
let iIndex = 0;

regBtn.addEventListener("click", () => {
    document.querySelector(".log-start").style.display = "none";
    document.querySelector(".reg-box").style.display = "flex";

    const regSaveBtn = document.querySelector(".reg-save");

    regSaveBtn.addEventListener("click", () => {
        let regLogin = regLogInp.value.trim();
        let regPassword = regPassInp.value.trim();
        let regPassword1 = regPassInp1.value.trim();

        if (regLogin.length === 0 || regPassword.length === 0 || regPassword1 === 0) {
            alert("Iltimos, berilgan qatorlarni bo'sh qoldirmang!");
        } else if (/^[a-zA-Z0-9]{5,15}$/.test(regLogin) && /^[a-zA-Z0-9]{5,15}$/.test(regPassword) && /^[a-zA-Z0-9]{5,15}$/.test(regPassword1) && regPassword === regPassword1) {
            regLogin = Array.from(regLogin);
            regPassword = Array.from(regPassword);

            function encrypt(text) {
                let result = "";
                for (let i = 0; i < text.length; i++) {
                    result += String.fromCharCode(text.charCodeAt(i) + 1);
                }
                return result;
            }
            // Login va parolni shifrlash
            let encryptedLogin = encrypt(regLogin.join(''));
            let encryptedPassword = encrypt(regPassword.join(''));
            // function decrypt(text) {
            //     let result = "";
            //     for (let i = 0; i < text.length; i++) {
            //         result += String.fromCharCode(text.charCodeAt(i) - 1);
            //     }
            //     return result;
            // }

            // Shifrlangan login va parolni qaytarish
            // let decryptedLogin = decrypt(encryptedLogin);
            // let decryptedPassword = decrypt(encryptedPassword);

            // console.log(encryptedLogin,encryptedPassword,decryptedLogin,decryptedPassword);

            localStorage.setItem("login", encryptedLogin);
            localStorage.setItem("password", encryptedPassword);
            alert("Muvaffaqiyatli Ro'yhatdan o'tildi! ✔✔✔")

            regLogInp.value = "";
            regPassInp.value = "";
            regPassInp1.value = "";

            document.querySelector(".reg-box").style.display = "none";
            logBtn.click();
        } else if (regPassword !== regPassword1) {
            alert("Parollar mos kelmayabti!")
        }
        else {
            alert("Login va Parol uzunligi 5 dan kam, 15 dan ko'p bo'lishi, faqatgina harflar va raqamlar uchun ruxsat berilgan.");
        }
    });
});

logPassInp.addEventListener("keyup",(e)=>{
    for (let i = 0; i < logPassInp.value.length; i++) {
        console.log(i);
        if (i/2==iIndex) {
            speed[inpIndex].style.background = "green";
            iIndex++
            inpIndex++;
        }
    }
    if (/^[a-zA-Z0-9]{3,19}$/.test(e.target.value)) {
        logPassInp.classList.remove("error");
        logPassInp.classList.add("success");
}   else{
        logPassInp.classList.remove("success");
        logPassInp.classList.add("error");
    }
    
    
})

logBtn.addEventListener("click", () => {
    document.querySelector(".log-start").style.display = "none";
    document.querySelector(".log-box").style.display = "flex";

    const logSaveBtn = document.querySelector(".log-save");

    logSaveBtn.addEventListener("click", () => {
        let login = logLogInp.value.trim();
        let password = logPassInp.value.trim();

        if (login.length === 0 || password.length === 0) {
            alert("Iltimos, berilgan qatorlarni bo'sh qoldirmang!");
        } else if (/^[a-zA-Z0-9]{5,15}$/.test(login) && /^[a-zA-Z0-9]{5,15}$/.test(password)) {
            login = Array.from(login);
            password = Array.from(password);
            function encrypt(text) {
                let result = "";
                for (let i = 0; i < text.length; i++) {
                    result += String.fromCharCode(text.charCodeAt(i) + 1);
                }
                return result;
            }

            let encryptedLogin = encrypt(login.join(''));
            let encryptedPassword = encrypt(password.join(''));

            if (localStorage.getItem("login") === encryptedLogin && localStorage.getItem("password") === encryptedPassword) {
                alert("Xush Kelibsiz! 😊😊😊");
                let time1 = new Date;
                let oldTime = time1.getTime()+10000;

                let cookieInterval = setInterval(() => {
                    let time = new Date;
                    document.cookie = `time = ${time.getTime()}`;
                    let cookieTime = document.cookie.slice(document.cookie.search("time") + 5, document.cookie.length)*1;
                    console.log(cookieTime);
                    if (cookieTime >=oldTime) {
                        alert("Vaqtingiz tugadi yana vaqt sotib olishingiz mumkin! 😜");
                        clearInterval(cookieInterval);
                        location.reload();
                    }
                }, 1000);

                logLogInp.value = "";
                logPassInp.value = "";

                document.querySelector(".log-box").style.display = "none";
                document.querySelector(".log-container").style.display = "none";
                document.querySelector(".start-container").style.display = "flex";
            } else {
                alert("Login yoki Parol xato!");
            }

        } else {
            alert("Login va Parol uzunligi 5 dan kam, 15 dan ko'p bo'lishi, faqatgina harflar va raqamlar uchun ruxsat berilgan.");
        }
    })
})



settings.addEventListener("click", function setings() {
    setTimeout(() => {
        son++;
        document.querySelector(".start-container").style.display = "none";
        document.querySelector(".settings-container").style.display = "flex";

        easyBtn.addEventListener("click", () => {
            level = "easy";
            document.querySelector(".settings-container").style.display = "none";
            document.querySelector(".start-container").style.display = "flex";
            settings.removeEventListener("click", setings);
            start.addEventListener("click", () => {
                let letter1 = document.querySelector(".letter-1");
                let letter2 = document.querySelector(".letter-2");
                let letter3 = document.querySelector(".letter-3");
                let letter4 = document.querySelector(".letter-4");
                let letter5 = document.querySelector(".letter-5");
                let dishF = document.querySelector(".dish-F");
                let dishE = document.querySelector(".dish-E");
                let dishI = document.querySelector(".dish-I");
                let dishM = document.querySelector(".dish-M");
                let dishZ = document.querySelector(".dish-Z");
                let starArr = Array.from(document.querySelector(".star-container").children);
                let starArr1 = Array.from(document.querySelector(".star-end-container").children);
                let timeNum = document.querySelector(".time-number");
                let minut = document.querySelector(".minut");
                let sekund = document.querySelector(".sekund");
                let s = 0;

                starArr.forEach((e) => {
                    e.style.background = "white";
                });
                starArr1.forEach((e) => {
                    e.style.background = "white";
                });

                function keyF(min, max) {
                    f = Math.trunc(Math.random() * (max - min)) + min;
                    return f;
                }

                function keyE(min, max) {
                    e = Math.trunc(Math.random() * (max - min)) + min;
                    return e;
                }

                function keyI(min, max) {
                    i = Math.trunc(Math.random() * (max - min)) + min;
                    return i;
                }

                function keyM(min, max) {
                    m = Math.trunc(Math.random() * (max - min)) + min;
                    return m;
                }

                function keyZ(min, max) {
                    z = Math.trunc(Math.random() * (max - min)) + min;
                    return z;
                }

                dishF.style.height = `${keyF(45, 90)}%`;
                dishE.style.height = `${keyE(45, 90)}%`;
                dishI.style.height = `${keyI(45, 90)}%`;
                dishM.style.height = `${keyM(45, 90)}%`;
                dishZ.style.height = `${keyZ(45, 90)}%`;

                let lettersArr = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
                let newLetter1 = lettersArr.splice(Math.trunc(Math.random() * 26), 1)[0];
                let newLetter2 = lettersArr.splice(Math.trunc(Math.random() * 25), 1)[0];
                let newLetter3 = lettersArr.splice(Math.trunc(Math.random() * 24), 1)[0];
                let newLetter4 = lettersArr.splice(Math.trunc(Math.random() * 23), 1)[0];
                let newLetter5 = lettersArr.splice(Math.trunc(Math.random() * 22), 1)[0];

                letter1.innerHTML = `${newLetter1.toUpperCase()}`;
                letter2.innerHTML = `${newLetter2.toUpperCase()}`;
                letter3.innerHTML = `${newLetter3.toUpperCase()}`;
                letter4.innerHTML = `${newLetter4.toUpperCase()}`;
                letter5.innerHTML = `${newLetter5.toUpperCase()}`;

                document.querySelector(".start-container").style.display = "none";
                document.querySelector(".container").style.display = "flex";


                let l = 0;
                let o = 0;
                let p = 0;

                let intervalTime = setInterval(() => {
                    l++;

                    if (l % 100 === 0) {
                        l = 0;
                        o++;

                        if (o < 10) {
                            sekund.innerHTML = `0${o}`;
                        } else {
                            sekund.innerHTML = `${o}`;
                        }
                        if (o > 15) {
                            timeNum.style.color = "red";
                        } else {
                            timeNum.style.color = "green";
                        }

                        if (o % 60 === 0) {
                            o = 0;
                            p++;

                            if (p < 10) {
                                minut.innerHTML = `0${p}`;
                            } else {
                                minut.innerHTML = `${p}`;
                            }
                        }
                    }
                    if ((f <= 2 || f >= 98) && (e <= 2 || e >= 98) && (i <= 2 || i >= 98) && (m <= 2 || m >= 98) && (z <= 2 || z >= 98)) {
                        clearInterval(intervalTime);
                        setTimeout(() => {
                            document.querySelector(".container").style.display = "none";
                            document.querySelector(".end-container").style.display = "flex";
                            document.querySelector(".sekund1").innerHTML = o;
                            document.querySelector(".minut1").innerHTML = p;
                            let lvl = 0;
                            if (o > 45) {
                                lvl -= 3;
                            }
                            else if (o >= 25 && o < 35) {
                                lvl--;
                            }
                            else if (o <= 20) {
                                lvl++;
                            }
                            if (s <= 3 && s > 1) {
                                lvl--;
                            }
                            else if (s == 1) {
                                lvl -= 2;
                            }
                            else if (s > 3) {
                                lvl++;
                            }
                            else if (s == 0) {
                                lvl -= 3;
                            }
                            if (lvl == -2 || lvl == -3) {
                                document.querySelector(".animals-box").innerHTML = `<i class="fa-solid fa-frog"></i>`;
                                document.querySelector(".animals").innerHTML = `juda past`;
                            } else if (lvl == 0 || lvl == 1 || lvl == -1) {
                                document.querySelector(".animals-box").innerHTML = `<i class="fa-solid fa-dog"></i>`;
                                document.querySelector(".animals").innerHTML = `o'rtacha`;
                            } else if (lvl == 2 || lvl == 3) {
                                document.querySelector(".animals-box").innerHTML = `<i class="fa-solid fa-horse"></i>`;
                                document.querySelector(".animals").innerHTML = `juda tez`;
                            }
                            console.log(lvl, o, s);
                        }, 1200);
                    }
                }, 9);

                let intervalF = setInterval(() => {
                    f--;
                    dishF.style.height = `${f}%`;
                    if (f <= 2) {
                        document.querySelector(".dishF").classList.remove("animate");
                        clearInterval(intervalF);
                        letter1.innerHTML = "❌";
                    }
                    else if (f >= 98) {
                        clearInterval(intervalF);
                        letter1.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (f == 35) {
                        document.querySelector(".dishF").classList.add("animate");
                        document.querySelector(".rectangle1").style.display = "none";
                    }
                    else if (f > 35) {
                        document.querySelector(".dishF").classList.remove("animate");
                    }
                }, 250);

                let intervalE = setInterval(() => {
                    e--;
                    dishE.style.height = `${e}%`;
                    if (e <= 2) {
                        document.querySelector(".dishE").classList.remove("animate");
                        clearInterval(intervalE);
                        letter2.innerHTML = "❌";
                    }
                    else if (e >= 98) {
                        clearInterval(intervalE);
                        letter2.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (e == 35) {
                        document.querySelector(".dishE").classList.add("animate");
                        document.querySelector(".rectangle2").style.display = "none";
                    }
                    else if (e > 35) {
                        document.querySelector(".dishE").classList.remove("animate");
                    }
                }, 250);

                let intervalI = setInterval(() => {
                    i--;
                    dishI.style.height = `${i}%`;
                    if (i <= 2) {
                        document.querySelector(".dishI").classList.remove("animate");
                        clearInterval(intervalI);
                        letter3.innerHTML = "❌";
                    }
                    else if (i >= 98) {
                        clearInterval(intervalI);
                        letter3.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (i == 35) {
                        document.querySelector(".dishI").classList.add("animate");
                        document.querySelector(".rectangle3").style.display = "none";
                    }
                    else if (i > 35) {
                        document.querySelector(".dishI").classList.remove("animate");
                    }
                }, 250);

                let intervalM = setInterval(() => {
                    m--;
                    dishM.style.height = `${m}%`;
                    if (m <= 2) {
                        document.querySelector(".dishM").classList.remove("animate");
                        clearInterval(intervalM);
                        letter4.innerHTML = "❌";
                    }
                    else if (m >= 98) {
                        clearInterval(intervalM);
                        letter4.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (m == 35) {
                        document.querySelector(".dishM").classList.add("animate");
                        document.querySelector(".rectangle4").style.display = "none";
                    }
                    else if (m > 35) {
                        document.querySelector(".dishM").classList.remove("animate");
                    }
                }, 250);

                let intervalZ = setInterval(() => {
                    z--;
                    dishZ.style.height = `${z}%`;
                    if (z <= 2) {
                        document.querySelector(".dishZ").classList.remove("animate");
                        clearInterval(intervalZ);
                        letter5.innerHTML = "❌";
                    }
                    else if (z >= 98) {
                        clearInterval(intervalZ);
                        letter5.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (z == 35) {
                        document.querySelector(".dishZ").classList.add("animate");
                        document.querySelector(".rectangle5").style.display = "none";
                    }
                    else if (z > 35) {
                        document.querySelector(".dishZ").classList.remove("animate");
                    }
                }, 250);
                let letter1UpperCase = `${newLetter1.toUpperCase()}`;
                let letter2UpperCase = `${newLetter2.toUpperCase()}`;
                let letter3UpperCase = `${newLetter3.toUpperCase()}`;
                let letter4UpperCase = `${newLetter4.toUpperCase()}`;
                let letter5UpperCase = `${newLetter5.toUpperCase()}`;

                document.body.addEventListener("keyup", (el) => {
                    if (el.key === letter1UpperCase || el.key === newLetter1) {
                        if (f > 2 && f <= 98) {
                            f += 2;
                            dishF.style.height = `${f}%`;
                        }
                    } if (el.key === letter2UpperCase || el.key === newLetter2) {
                        if (e > 2 && e <= 98) {
                            e += 2;
                            dishE.style.height = `${e}%`;
                        }
                    } if (el.key === letter3UpperCase || el.key === newLetter3) {
                        if (i > 2 && i <= 98) {
                            i += 2;
                            dishI.style.height = `${i}%`;
                        }
                    } if (el.key === letter4UpperCase || el.key === newLetter4) {
                        if (m > 2 && m <= 98) {
                            m += 2;
                            dishM.style.height = `${m}%`;
                        }
                    } if (el.key === letter5UpperCase || el.key === newLetter5) {
                        if (z > 2 && z <= 98) {
                            z += 2;
                            dishZ.style.height = `${z}%`;
                        }
                    }
                });
            });
        });

        normalBtn.addEventListener("click", () => {
            level = "normal";
            document.querySelector(".settings-container").style.display = "none";
            document.querySelector(".start-container").style.display = "flex";
            settings.removeEventListener("click", setings);
            start.addEventListener("click", () => {
                let letter1 = document.querySelector(".letter-1");
                let letter2 = document.querySelector(".letter-2");
                let letter3 = document.querySelector(".letter-3");
                let letter4 = document.querySelector(".letter-4");
                let letter5 = document.querySelector(".letter-5");
                let dishF = document.querySelector(".dish-F");
                let dishE = document.querySelector(".dish-E");
                let dishI = document.querySelector(".dish-I");
                let dishM = document.querySelector(".dish-M");
                let dishZ = document.querySelector(".dish-Z");
                let starArr = Array.from(document.querySelector(".star-container").children);
                let starArr1 = Array.from(document.querySelector(".star-end-container").children);
                let timeNum = document.querySelector(".time-number");
                let minut = document.querySelector(".minut");
                let sekund = document.querySelector(".sekund");
                let s = 0;

                starArr.forEach((e) => {
                    e.style.background = "white";
                });
                starArr1.forEach((e) => {
                    e.style.background = "white";
                });

                function keyF(min, max) {
                    f = Math.trunc(Math.random() * (max - min)) + min;
                    return f;
                }

                function keyE(min, max) {
                    e = Math.trunc(Math.random() * (max - min)) + min;
                    return e;
                }

                function keyI(min, max) {
                    i = Math.trunc(Math.random() * (max - min)) + min;
                    return i;
                }

                function keyM(min, max) {
                    m = Math.trunc(Math.random() * (max - min)) + min;
                    return m;
                }

                function keyZ(min, max) {
                    z = Math.trunc(Math.random() * (max - min)) + min;
                    return z;
                }

                dishF.style.height = `${keyF(45, 90)}%`;
                dishE.style.height = `${keyE(45, 90)}%`;
                dishI.style.height = `${keyI(45, 90)}%`;
                dishM.style.height = `${keyM(45, 90)}%`;
                dishZ.style.height = `${keyZ(45, 90)}%`;

                let lettersArr = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
                let newLetter1 = lettersArr.splice(Math.trunc(Math.random() * 26), 1)[0];
                let newLetter2 = lettersArr.splice(Math.trunc(Math.random() * 25), 1)[0];
                let newLetter3 = lettersArr.splice(Math.trunc(Math.random() * 24), 1)[0];
                let newLetter4 = lettersArr.splice(Math.trunc(Math.random() * 23), 1)[0];
                let newLetter5 = lettersArr.splice(Math.trunc(Math.random() * 22), 1)[0];



                letter1.innerHTML = `${newLetter1.toUpperCase()}`;
                letter2.innerHTML = `${newLetter2.toUpperCase()}`;
                letter3.innerHTML = `${newLetter3.toUpperCase()}`;
                letter4.innerHTML = `${newLetter4.toUpperCase()}`;
                letter5.innerHTML = `${newLetter5.toUpperCase()}`;

                document.querySelector(".start-container").style.display = "none";
                document.querySelector(".container").style.display = "flex";


                let l = 0;
                let o = 0;
                let p = 0;

                let intervalTime = setInterval(() => {
                    l++;

                    if (l % 100 === 0) {
                        l = 0;
                        o++;

                        if (o < 10) {
                            sekund.innerHTML = `0${o}`;
                        } else {
                            sekund.innerHTML = `${o}`;
                        }
                        if (o > 15) {
                            timeNum.style.color = "red";
                        } else {
                            timeNum.style.color = "green";
                        }

                        if (o % 60 === 0) {
                            o = 0;
                            p++;

                            if (p < 10) {
                                minut.innerHTML = `0${p}`;
                            } else {
                                minut.innerHTML = `${p}`;
                            }
                        }
                    }
                    if ((f <= 2 || f >= 98) && (e <= 2 || e >= 98) && (i <= 2 || i >= 98) && (m <= 2 || m >= 98) && (z <= 2 || z >= 98)) {
                        clearInterval(intervalTime);
                        setTimeout(() => {
                            document.querySelector(".container").style.display = "none";
                            document.querySelector(".end-container").style.display = "flex";
                            document.querySelector(".sekund1").innerHTML = o;
                            document.querySelector(".minut1").innerHTML = p;
                            let lvl = 0;
                            if (o > 45) {
                                lvl -= 3;
                            }
                            if (o >= 25 && o < 35) {
                                lvl--;
                            }
                            if (o <= 15) {
                                lvl++;
                            }
                            if (s <= 3 && s > 1) {
                                lvl--;
                            }
                            if (s == 1) {
                                lvl -= 2;
                            }
                            if (s > 3) {
                                lvl++;
                            }
                            if (s == 0) {
                                lvl -= 3;
                            }
                            if (lvl == -2 || lvl == -3 || lvl == -1) {
                                document.querySelector(".animals-box").innerHTML = `<i class="fa-solid fa-frog"></i>`;
                                document.querySelector(".animals").innerHTML = `juda past`;
                            } else if (lvl == 0 || lvl == 1) {
                                document.querySelector(".animals-box").innerHTML = `<i class="fa-solid fa-dog"></i>`;
                                document.querySelector(".animals").innerHTML = `o'rtacha`;
                            } else if (lvl == 2 || lvl == 3) {
                                document.querySelector(".animals-box").innerHTML = `<i class="fa-solid fa-horse"></i>`;
                                document.querySelector(".animals").innerHTML = `juda tez`;
                            }
                            console.log(lvl, o, s);
                        }, 1200);
                    }
                }, 9);

                let intervalF = setInterval(() => {
                    f--;
                    dishF.style.height = `${f}%`;
                    if (f <= 2) {
                        document.querySelector(".dishF").classList.remove("animate");
                        clearInterval(intervalF);
                        letter1.innerHTML = "❌";
                    }
                    else if (f >= 98) {
                        clearInterval(intervalF);
                        letter1.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (f == 35) {
                        document.querySelector(".dishF").classList.add("animate");
                        document.querySelector(".rectangle1").style.display = "none";
                    }
                    else if (f > 35) {
                        document.querySelector(".dishF").classList.remove("animate");
                    }
                }, 200);

                let intervalE = setInterval(() => {
                    e--;
                    dishE.style.height = `${e}%`;
                    if (e <= 2) {
                        document.querySelector(".dishE").classList.remove("animate");
                        clearInterval(intervalE);
                        letter2.innerHTML = "❌";
                    }
                    else if (e >= 98) {
                        clearInterval(intervalE);
                        letter2.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (e == 35) {
                        document.querySelector(".dishE").classList.add("animate");
                        document.querySelector(".rectangle2").style.display = "none";
                    }
                    else if (e > 35) {
                        document.querySelector(".dishE").classList.remove("animate");
                    }
                }, 200);

                let intervalI = setInterval(() => {
                    i--;
                    dishI.style.height = `${i}%`;
                    if (i <= 2) {
                        document.querySelector(".dishI").classList.remove("animate");
                        clearInterval(intervalI);
                        letter3.innerHTML = "❌";
                    }
                    else if (i >= 98) {
                        clearInterval(intervalI);
                        letter3.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (i == 35) {
                        document.querySelector(".dishI").classList.add("animate");
                        document.querySelector(".rectangle3").style.display = "none";
                    }
                    else if (i > 35) {
                        document.querySelector(".dishI").classList.remove("animate");
                    }
                }, 200);

                let intervalM = setInterval(() => {
                    m--;
                    dishM.style.height = `${m}%`;
                    if (m <= 2) {
                        document.querySelector(".dishM").classList.remove("animate");
                        clearInterval(intervalM);
                        letter4.innerHTML = "❌";
                    }
                    else if (m >= 98) {
                        clearInterval(intervalM);
                        letter4.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (m == 35) {
                        document.querySelector(".dishM").classList.add("animate");
                        document.querySelector(".rectangle4").style.display = "none";
                    }
                    else if (m > 35) {
                        document.querySelector(".dishM").classList.remove("animate");
                    }
                }, 200);

                let intervalZ = setInterval(() => {
                    z--;
                    dishZ.style.height = `${z}%`;
                    if (z <= 2) {
                        document.querySelector(".dishZ").classList.remove("animate");
                        clearInterval(intervalZ);
                        letter5.innerHTML = "❌";
                    }
                    else if (z >= 98) {
                        clearInterval(intervalZ);
                        letter5.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (z == 35) {
                        document.querySelector(".dishZ").classList.add("animate");
                        document.querySelector(".rectangle5").style.display = "none";
                    }
                    else if (z > 35) {
                        document.querySelector(".dishZ").classList.remove("animate");
                    }
                }, 200);
                let letter1UpperCase = `${newLetter1.toUpperCase()}`;
                let letter2UpperCase = `${newLetter2.toUpperCase()}`;
                let letter3UpperCase = `${newLetter3.toUpperCase()}`;
                let letter4UpperCase = `${newLetter4.toUpperCase()}`;
                let letter5UpperCase = `${newLetter5.toUpperCase()}`;

                document.body.addEventListener("keyup", (el) => {
                    if (el.key === letter1UpperCase || el.key === newLetter1) {
                        if (f > 2 && f <= 98) {
                            f += 2;
                            dishF.style.height = `${f}%`;
                        }
                    } if (el.key === letter2UpperCase || el.key === newLetter2) {
                        if (e > 2 && e <= 98) {
                            e += 2;
                            dishE.style.height = `${e}%`;
                        }
                    } if (el.key === letter3UpperCase || el.key === newLetter3) {
                        if (i > 2 && i <= 98) {
                            i += 2;
                            dishI.style.height = `${i}%`;
                        }
                    } if (el.key === letter4UpperCase || el.key === newLetter4) {
                        if (m > 2 && m <= 98) {
                            m += 2;
                            dishM.style.height = `${m}%`;
                        }
                    } if (el.key === letter5UpperCase || el.key === newLetter5) {
                        if (z > 2 && z <= 98) {
                            z += 2;
                            dishZ.style.height = `${z}%`;
                        }
                    }
                });

            });
        });

        hardBtn.addEventListener("click", () => {
            level = "hard";
            document.querySelector(".settings-container").style.display = "none";
            document.querySelector(".start-container").style.display = "flex";
            settings.removeEventListener("click", setings);
            start.addEventListener("click", () => {
                let letter1 = document.querySelector(".letter-1");
                let letter2 = document.querySelector(".letter-2");
                let letter3 = document.querySelector(".letter-3");
                let letter4 = document.querySelector(".letter-4");
                let letter5 = document.querySelector(".letter-5");
                let dishF = document.querySelector(".dish-F");
                let dishE = document.querySelector(".dish-E");
                let dishI = document.querySelector(".dish-I");
                let dishM = document.querySelector(".dish-M");
                let dishZ = document.querySelector(".dish-Z");
                let starArr = Array.from(document.querySelector(".star-container").children);
                let starArr1 = Array.from(document.querySelector(".star-end-container").children);
                let timeNum = document.querySelector(".time-number");
                let minut = document.querySelector(".minut");
                let sekund = document.querySelector(".sekund");
                let s = 0;

                starArr.forEach((e) => {
                    e.style.background = "white";
                });
                starArr1.forEach((e) => {
                    e.style.background = "white";
                });

                function keyF(min, max) {
                    f = Math.trunc(Math.random() * (max - min)) + min;
                    return f;
                }

                function keyE(min, max) {
                    e = Math.trunc(Math.random() * (max - min)) + min;
                    return e;
                }

                function keyI(min, max) {
                    i = Math.trunc(Math.random() * (max - min)) + min;
                    return i;
                }

                function keyM(min, max) {
                    m = Math.trunc(Math.random() * (max - min)) + min;
                    return m;
                }

                function keyZ(min, max) {
                    z = Math.trunc(Math.random() * (max - min)) + min;
                    return z;
                }

                dishF.style.height = `${keyF(45, 90)}%`;
                dishE.style.height = `${keyE(45, 90)}%`;
                dishI.style.height = `${keyI(45, 90)}%`;
                dishM.style.height = `${keyM(45, 90)}%`;
                dishZ.style.height = `${keyZ(45, 90)}%`;

                let lettersArr = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
                let newLetter1 = lettersArr.splice(Math.trunc(Math.random() * 26), 1)[0];
                let newLetter2 = lettersArr.splice(Math.trunc(Math.random() * 25), 1)[0];
                let newLetter3 = lettersArr.splice(Math.trunc(Math.random() * 24), 1)[0];
                let newLetter4 = lettersArr.splice(Math.trunc(Math.random() * 23), 1)[0];
                let newLetter5 = lettersArr.splice(Math.trunc(Math.random() * 22), 1)[0];



                letter1.innerHTML = `${newLetter1.toUpperCase()}`;
                letter2.innerHTML = `${newLetter2.toUpperCase()}`;
                letter3.innerHTML = `${newLetter3.toUpperCase()}`;
                letter4.innerHTML = `${newLetter4.toUpperCase()}`;
                letter5.innerHTML = `${newLetter5.toUpperCase()}`;

                document.querySelector(".start-container").style.display = "none";
                document.querySelector(".container").style.display = "flex";


                let l = 0;
                let o = 0;
                let p = 0;

                let intervalTime = setInterval(() => {
                    l++;

                    if (l % 100 === 0) {
                        l = 0;
                        o++;

                        if (o < 10) {
                            sekund.innerHTML = `0${o}`;
                        } else {
                            sekund.innerHTML = `${o}`;
                        }
                        if (o > 15) {
                            timeNum.style.color = "red";
                        } else {
                            timeNum.style.color = "green";
                        }

                        if (o % 60 === 0) {
                            o = 0;
                            p++;

                            if (p < 10) {
                                minut.innerHTML = `0${p}`;
                            } else {
                                minut.innerHTML = `${p}`;
                            }
                        }
                    }
                    if ((f <= 2 || f >= 98) && (e <= 2 || e >= 98) && (i <= 2 || i >= 98) && (m <= 2 || m >= 98) && (z <= 2 || z >= 98)) {
                        clearInterval(intervalTime);
                        setTimeout(() => {
                            document.querySelector(".container").style.display = "none";
                            document.querySelector(".end-container").style.display = "flex";
                            document.querySelector(".sekund1").innerHTML = o;
                            document.querySelector(".minut1").innerHTML = p;
                            let lvl = 0;
                            if (o > 45) {
                                lvl -= 3;
                            }
                            if (o >= 25 && o < 35) {
                                lvl--;
                            }
                            if (o <= 10) {
                                lvl++;
                            }
                            if (s <= 3 && s > 1) {
                                lvl--;
                            }
                            if (s == 1) {
                                lvl -= 2;
                            }
                            if (s > 3) {
                                lvl++;
                            }
                            if (s == 0) {
                                lvl -= 3;
                            }
                            if (lvl == 0 || lvl == -2 || lvl == -3 || lvl == -1) {
                                document.querySelector(".animals-box").innerHTML = `<i class="fa-solid fa-frog"></i>`;
                                document.querySelector(".animals").innerHTML = `juda past`;
                            } else if (lvl == 1) {
                                document.querySelector(".animals-box").innerHTML = `<i class="fa-solid fa-dog"></i>`;
                                document.querySelector(".animals").innerHTML = `o'rtacha`;
                            } else if (lvl == 2 || lvl == 3) {
                                document.querySelector(".animals-box").innerHTML = `<i class="fa-solid fa-horse"></i>`;
                                document.querySelector(".animals").innerHTML = `juda tez`;
                            }
                            console.log(lvl, o, s);
                        }, 1200);
                    }
                }, 9);

                let intervalF = setInterval(() => {
                    f--;
                    dishF.style.height = `${f}%`;
                    if (f <= 2) {
                        document.querySelector(".dishF").classList.remove("animate");
                        clearInterval(intervalF);
                        letter1.innerHTML = "❌";
                    }
                    else if (f >= 98) {
                        clearInterval(intervalF);
                        letter1.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (f == 35) {
                        document.querySelector(".dishF").classList.add("animate");
                        document.querySelector(".rectangle1").style.display = "none";
                    }
                    else if (f > 35) {
                        document.querySelector(".dishF").classList.remove("animate");
                    }
                }, 150);

                let intervalE = setInterval(() => {
                    e--;
                    dishE.style.height = `${e}%`;
                    if (e <= 2) {
                        document.querySelector(".dishE").classList.remove("animate");
                        clearInterval(intervalE);
                        letter2.innerHTML = "❌";
                    }
                    else if (e >= 98) {
                        clearInterval(intervalE);
                        letter2.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (e == 35) {
                        document.querySelector(".dishE").classList.add("animate");
                        document.querySelector(".rectangle2").style.display = "none";
                    }
                    else if (e > 35) {
                        document.querySelector(".dishE").classList.remove("animate");
                    }
                }, 150);

                let intervalI = setInterval(() => {
                    i--;
                    dishI.style.height = `${i}%`;
                    if (i <= 2) {
                        document.querySelector(".dishI").classList.remove("animate");
                        clearInterval(intervalI);
                        letter3.innerHTML = "❌";
                    }
                    else if (i >= 98) {
                        clearInterval(intervalI);
                        letter3.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (i == 35) {
                        document.querySelector(".dishI").classList.add("animate");
                        document.querySelector(".rectangle3").style.display = "none";
                    }
                    else if (i > 35) {
                        document.querySelector(".dishI").classList.remove("animate");
                    }
                }, 150);

                let intervalM = setInterval(() => {
                    m--;
                    dishM.style.height = `${m}%`;
                    if (m <= 2) {
                        document.querySelector(".dishM").classList.remove("animate");
                        clearInterval(intervalM);
                        letter4.innerHTML = "❌";
                    }
                    else if (m >= 98) {
                        clearInterval(intervalM);
                        letter4.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (m == 35) {
                        document.querySelector(".dishM").classList.add("animate");
                        document.querySelector(".rectangle4").style.display = "none";
                    }
                    else if (m > 35) {
                        document.querySelector(".dishM").classList.remove("animate");
                    }
                }, 150);

                let intervalZ = setInterval(() => {
                    z--;
                    dishZ.style.height = `${z}%`;
                    if (z <= 2) {
                        document.querySelector(".dishZ").classList.remove("animate");
                        clearInterval(intervalZ);
                        letter5.innerHTML = "❌";
                    }
                    else if (z >= 98) {
                        clearInterval(intervalZ);
                        letter5.innerHTML = "✅";
                        starArr[s].style.background = "gold";
                        starArr1[s].style.background = "gold";
                        s++;
                    }
                    else if (z == 35) {
                        document.querySelector(".dishZ").classList.add("animate");
                        document.querySelector(".rectangle5").style.display = "none";
                    }
                    else if (z > 35) {
                        document.querySelector(".dishZ").classList.remove("animate");
                    }
                }, 150);
                let letter1UpperCase = `${newLetter1.toUpperCase()}`;
                let letter2UpperCase = `${newLetter2.toUpperCase()}`;
                let letter3UpperCase = `${newLetter3.toUpperCase()}`;
                let letter4UpperCase = `${newLetter4.toUpperCase()}`;
                let letter5UpperCase = `${newLetter5.toUpperCase()}`;

                document.body.addEventListener("keyup", (el) => {
                    if (el.key === letter1UpperCase || el.key === newLetter1) {
                        if (f > 2 && f <= 98) {
                            f += 2;
                            dishF.style.height = `${f}%`;
                        }
                    } if (el.key === letter2UpperCase || el.key === newLetter2) {
                        if (e > 2 && e <= 98) {
                            e += 2;
                            dishE.style.height = `${e}%`;
                        }
                    } if (el.key === letter3UpperCase || el.key === newLetter3) {
                        if (i > 2 && i <= 98) {
                            i += 2;
                            dishI.style.height = `${i}%`;
                        }
                    } if (el.key === letter4UpperCase || el.key === newLetter4) {
                        if (m > 2 && m <= 98) {
                            m += 2;
                            dishM.style.height = `${m}%`;
                        }
                    } if (el.key === letter5UpperCase || el.key === newLetter5) {
                        if (z > 2 && z <= 98) {
                            z += 2;
                            dishZ.style.height = `${z}%`;
                        }
                    }
                });

            });
        });
    }, 100);
})



document.querySelector(".reload").addEventListener("click", () => {
    location.reload();
});

