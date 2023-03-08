import React, { useState, useEffect } from 'react'
import useDidMountEffect from 'components/parts/useDidMountEffect'
import api from 'components/utils/api'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Filters from 'components/dashboard/Filters'
import PostsListSkeleton from 'components/parts/PostsListSkeleton'
import PostsItem from 'components/parts/PostsItem'
import 'react-loading-skeleton/dist/skeleton.css'

export default function App(){
    const [data , setData] = useState({
        // responseData: null,
        responseData: [
            {
                "id": 5375796831,
                "body": "Victoria Hernandez, USA TODAY  Who could pass LeBron James as the NBA's all-time leading scorer?\n As the chances of LeBron James getting his fifth NBA championship ring this year seem slimmer and slimmer , the Los Angeles Lakers made sure to celebrate the new scoring king in a glitzy way nonetheless.\n  The team reached out to Eliantte and Co. to commission a custom pendant commemorating James passing Kareem Abdul-Jabbar for most career points in NBA history.\n  \"It was a monumental moment that they wanted to commemorate,\" Simon Babaev of Eliantte and Co. said to USA TODAY Sports.\n  Elliot Eliantte, the owner of the brand, designed the piece himself and shared a post of the final product on Monday . The diamond-encrusted pendant is solid gold and comes on an Eliantte signature infinity link chain, which is fastened with the NBA logo also set in diamonds. The pendant features design elements from throughout James' career.\n  \"The inspiration is everything that is LeBron as a person, where he came from, where he is and where he is going,\" Babaev said.\n  The center of the pendant features a roaring lion crowned with the 19-time All-Star's \"LJ\" logo. There's numerals for both his numbers, 23 and 6. The back features the logos of all three teams James has played for, along with a list of his stats. The piece has its own box, which says, \"All-Time Leading Scorer\" on top and inside the lid says, \"The Kid From Akron.\"\n  DRIP CHECK: Derek Carr buys teammates Davante Adams Maxx Crosby diamond pendants amid departure from Raiders\n  James is a customer of Eliantte's and has purchased several pieces. Babaev said that what makes him great beyond the court is his authenticity.\n  \"He is true to who he is,\" he said.",
                "author": {
                    "avatar_url": null,
                    "id": 14557062,
                    "name": "Victoria Hernandez"
                },
                "links": {
                    "canonical": null,
                    "permalink": "https://sports.yahoo.com/los-angeles-lakers-gift-lebron-230635754.html",
                    "related_stories": "/related_stories?story_id=5375796831",
                    "clusters": "/stories?clusters[]=445635271"
                },
                "media": [],
                "published_at": "2023-03-07 23:22:17+00:00",
                "sentiment": {
                    "body": {
                        "polarity": "positive",
                        "score": 0.74
                    },
                    "title": {
                        "polarity": "positive",
                        "score": 0.55
                    }
                },
                "summary": {
                    "sentences": [
                        "Victoria Hernandez, USA TODAY  ",
                        "The team reached out to Eliantte and Co. to commission a custom pendant commemorating James passing Kareem Abdul-Jabbar for most career points in NBA history.\n  ",
                        "Derek Carr buys teammates Davante Adams Maxx Crosby diamond pendants amid departure from Raiders\n  James is a customer of Eliantte's and has purchased several pieces.",
                        "The diamond-encrusted pendant is solid gold and comes on an Eliantte signature infinity link chain, which is fastened with the NBA logo also set in diamonds.",
                        "Who could pass LeBron James as the NBA's all-time leading scorer?\n "
                    ]
                },
                "title": "Los Angeles Lakers gift LeBron James with diamond pendant for scoring title",
                "words_count": 302
            },
            {
                "id": 5375792655,
                "body": "As the chances of LeBron James getting his fifth NBA championship ring this year seem slimmer and slimmer, the Los Angeles Lakers made sure to celebrate the new scoring king in a glitzy way nonetheless.\n\nThe team reached out to Eliantte and Co. to commission a custom pendant commemorating James passing Kareem Abdul-Jabbar for most career points in NBA history.\n\n\"It was a monumental moment that they wanted to commemorate,\" Simon Babaev of Eliantte and Co. said to USA TODAY Sports.\n\nElliot Eliantte, the owner of the brand, designed the piece himself and shared a post of the final product on Monday. The diamond-encrusted pendant is solid gold and comes on an Eliantte signature infinity link chain, which is fastened with the NBA logo also set in diamonds. The pendant features design elements from throughout James' career.\n\nKING JAMES:LeBron James breaks NBA’s all-time scoring record, passes Kareem Abdul-Jabbar\n\nFollow every game: Latest NBA Scores and Schedules\n\n\"The inspiration is everything that is LeBron as a person, where he came from, where he is and where he is going,\" Babaev said.\n\nThe center of the pendant features a roaring lion crowned with the 19-time All-Star's \"LJ\" logo. There's numerals for both his numbers, 23 and 6. The back features the logos of all three teams James has played for, along with a list of his stats. The piece has its own box, which says, \"All-Time Leading Scorer\" on top and inside the lid says, \"The Kid From Akron.\"\n\nDRIP CHECK:Derek Carr buys teammates Davante Adams, Maxx Crosby diamond pendants amid departure from Raiders\n\nJames is a customer of Eliantte's and has purchased several pieces. Babaev said that what makes him great beyond the court is his authenticity.\n\n\"He is true to who he is,\" he said.",
                "author": {
                    "avatar_url": null,
                    "id": 31042416,
                    "name": "Victoria Hernandez, USA TODAY"
                },
                "links": {
                    "canonical": null,
                    "permalink": "http://rssfeeds.usatoday.com/~/730250645/0/usatodaycomsports-topstories~Los-Angeles-Lakers-gift-LeBron-James-with-diamond-pendant-for-scoring-title/",
                    "related_stories": "/related_stories?story_id=5375792655",
                    "clusters": "/stories?clusters[]=445635271"
                },
                "media": [],
                "published_at": "2023-03-07 23:15:59+00:00",
                "sentiment": {
                    "body": {
                        "polarity": "positive",
                        "score": 0.81
                    },
                    "title": {
                        "polarity": "positive",
                        "score": 0.55
                    }
                },
                "summary": {
                    "sentences": [
                        "As the chances of LeBron James getting his fifth NBA championship ring this year seem slimmer and slimmer, the Los Angeles Lakers made sure to celebrate the new scoring king in a glitzy way nonetheless.\n\n",
                        "The team reached out to Eliantte and Co. to commission a custom pendant commemorating James passing Kareem Abdul-Jabbar for most career points in NBA history.\n\n",
                        "Derek Carr buys teammates Davante Adams, Maxx Crosby diamond pendants amid departure from Raiders\n\nJames is a customer of Eliantte's and has purchased several pieces.",
                        "KING JAMES:LeBron James breaks NBA’s all-time scoring record, passes Kareem Abdul-Jabbar\n\nFollow every game: Latest NBA Scores and Schedules\n\n\"The inspiration is everything that is LeBron as a person, where he came from, where he is and where he is going,\" Babaev said.\n\n",
                        "The diamond-encrusted pendant is solid gold and comes on an Eliantte signature infinity link chain, which is fastened with the NBA logo also set in diamonds."
                    ]
                },
                "title": "Los Angeles Lakers gift LeBron James with diamond pendant for scoring title",
                "words_count": 305
            },
            {
                "id": 5375479133,
                "body": "Jennifer Garner is spending special time with the most important man in her life – her son.\nThe actress attended the Sunday night Los Angeles Lakers and Golden State Warriors game with 10-year-old Samuel Garner Affleck. The happy mother-son duo cheered on the teams from their courtside seats, with Garner in a soft blue sweater and Samuel matching her in a bright blue hoodie. A graphic of Stephen Curry adorned the front.\n  Read More: Jennifer Garner On Filming ‘Party Down’ Magic Mushrooms Scene Without Personal ‘Experience’ (Exclusive)\n  Jennifer Garner and her son Samuel Garner Affleck – Photo: Allen Berezovsky/ Getty Images Jennifer Garner and her son Samuel Garner Affleck – Photo: Allen Berezovsky/Getty Images\n  Garner shares Samuel with her ex Ben Affleck, along with their children 14-year-old Seraphina and 17-year-old Violet.\n  The mother-son hangout comes after Samuel spent the 2023 NBA All-Star Weekend in Salt Lake City bonding with his dad, reports People.",
                "author": {
                    "avatar_url": null,
                    "id": 3770137,
                    "name": "Anita Tai"
                },
                "links": {
                    "canonical": null,
                    "permalink": "https://www.imdb.com/news/ni63985486",
                    "related_stories": "/related_stories?story_id=5375479133",
                    "clusters": "/stories?clusters[]=445158823"
                },
                "media": [
                    "https://m.media-amazon.com/images/M/MV5BNDkzOWJmNTctMzE3MC00OTZlLWIyZTYtMTM5ZmUyZmI2YmE3XkEyXkFqcGdeQXVyMTE0MzQwMjgz._V1_SY150_CR39,0,100,150_AL_.jpg"
                ],
                "published_at": "2023-03-07 21:37:57+00:00",
                "sentiment": {
                    "body": {
                        "polarity": "positive",
                        "score": 1
                    },
                    "title": {
                        "polarity": "positive",
                        "score": 0.72
                    }
                },
                "summary": {
                    "sentences": [
                        "Jennifer Garner is spending special time with the most important man in her life – her son.\n",
                        "Allen Berezovsky/ Getty Images Jennifer Garner and her son Samuel Garner Affleck – Photo: Allen Berezovsky/Getty Images\n  Garner shares Samuel with her ex Ben Affleck, along with their children 14-year-old Seraphina and 17-year-old Violet.\n  ",
                        "Read More: Jennifer Garner On Filming ‘Party Down’ Magic Mushrooms Scene Without Personal ‘Experience’ (Exclusive)\n  Jennifer Garner and her son Samuel Garner Affleck – Photo:",
                        "The happy mother-son duo cheered on the teams from their courtside seats, with Garner in a soft blue sweater and Samuel matching her in a bright blue hoodie.",
                        "The actress attended the Sunday night Los Angeles Lakers and Golden State Warriors game with 10-year-old Samuel Garner Affleck."
                    ]
                },
                "title": "Jennifer Garner Has A Cute Date Night With Son Samuel Garner Affleck At Lakers Game",
                "words_count": 160
            },
            {
                "id": 5375466120,
                "body": "Los Angeles Lakers Stax   Continue reading  Browns have automatic right to restructure Deshaun Watson's contract  Mike Florio\n There's an important reason why quarterback Deshaun Watson is reportedly open to a restructuring of his contract. He has no choice.\n  Per a source with knowledge of the contract, the Browns have the right to convert “any portion” of Watson's compensation (salary, bonuses, etc.) into a signing bonus, in any year of the contract.\n  This year, Watson has a $46 million salary and a cap number of $54.993 million. With a minimum salary for Watson at $1.08 million, $44.92 million can be converted to a signing bonus and prorated. That would push $33.69 million to future years, and it would drop Watson's cap number to $21.3 million.\n  If the Browns want to spread the amount for more than the remaining years of the deal, a renegotiation would be needed. For example, the Browns and Watson could add a voidable year.\n  For now, though, the Browns can create $33,69 million if the team chooses, by converting most of his 2023 salary into a signing bonus. Whether Watson wants to do it doesn't matter. Even though every dollar of the contract is fully guaranteed, it's always better to have the money than to not have the money.\n  One last point — even though the money would become a signing bonus, it's not subject to forfeiture in the usual sense. Per the terms of the deal, any potential forfeiture of the money converted to signing bonus ends when the next regular season concludes.\n  Browns have automatic right to restructure Deshaun Watson's contract originally appeared on Pro Football Talk\n  Commissioner Jay Monahan on LIV golfers seeking reinstatement to PGA Tour, possible merger\n  Tom D'Angelo, Palm Beach Post\n  PONTE VEDRA BEACH - PGA Tour commissioner Jay Monahan was asked Tuesday about two topical issues related to LIV Golf: Players seeking reinstatement to the PGA Tour and the possibility of two organizations merging.\n  In June, before LIV's inaugural event in London, Monahan informed his membership any player who joined LIV was suspended from the PGA Tour. Although suspensions were lengthened depending how many times a player teed it up at a LIV event, Monahan has never said the suspensions were permanent.\n  Still, a path back at this point has not been discussed, Monahan said Tuesday during his state of the tour news conference ahead of the Players Championship.\n  \"I've been hearing that a lot lately and I'm not certain where that's coming from,\" Monahan said Tuesday when asked about rumors of LIV golfers possibly seeking a path back to the PGA Tour. \"The players that are playing on that tour are contractually obligated to play on that tour. So any hypotheticals at this point really aren't relevant.\n  \"But our position, to answer your question directly, has not changed.\"\n  Recent: Rory McIlroy on PGA Tour players meeting: 'Temperature in room nowhere as hot as I anticipated'\n  More Coverage: With proposed PGA Tour schedule, locals stars have no excuse to skip Honda | D'Angelo\n  PGA Tour Commissioner Jay Monahan speaks during a news conference before the start of the Travelers Championship golf tournament at TPC River Highlands, Wednesday, June 22, 2022, in Cromwell, Conn. (AP Photo/Seth Wenig)\n  Golf Channel's Rex Hoggard reported Monday that whispers of players who might be reconsidering have grown louder. Some players are willing to forgive and accept their peers back to the tour.\n  “I don't know what that looks like, but I would say there should be (a path back),” Rickie Fowler told Hoggard. “The Tour was never created to be closed off. Now there may be, whether there are suspensions or a period of time where they may not be able to try. But I think there should always be a way back in.”\n  Later, Monahan was asked about a possible partnership with LIV down the road.\n  \"What I want to see is us continue to grow with our membership, and to me getting into hypothetical situations given where we currently are is not a worthwhile effort,\" Monahan said.\n  He than added. \"That's not a possibility.\"\n  This article originally appeared on Palm Beach Post: How Jay Monahan addresses question of LIV golfers returning to PGA Tour",
                "author": {
                    "avatar_url": null,
                    "id": 3040616,
                    "name": ""
                },
                "links": {
                    "canonical": null,
                    "permalink": "https://sports.yahoo.com/m/5691da82-46c4-3cd5-8209-7ab86be10b59/los-angeles-lakers-stax.html",
                    "related_stories": "/related_stories?story_id=5375466120",
                    "clusters": "/stories?clusters[]=442912239"
                },
                "media": [
                    "https://s.yimg.com/am/365d/b5f26b0e33faf43e87da07d4f8658dff"
                ],
                "published_at": "2023-03-07 21:34:08+00:00",
                "sentiment": {
                    "body": {
                        "polarity": "positive",
                        "score": 0.61
                    },
                    "title": {
                        "polarity": "neutral",
                        "score": 0.45
                    }
                },
                "summary": {
                    "sentences": [
                        "Los Angeles Lakers Stax   Continue reading  Browns have automatic right to restructure Deshaun Watson's contract  Mike Florio\n There's an important reason why quarterback Deshaun Watson is reportedly open to a restructuring of his contract.",
                        "Browns have automatic right to restructure Deshaun Watson's contract originally appeared on Pro Football Talk\n  Commissioner Jay Monahan on LIV golfers seeking reinstatement to PGA Tour, possible merger\n  Tom D'Angelo, Palm Beach Post\n  PONTE VEDRA BEACH - PGA Tour commissioner Jay Monahan was asked Tuesday about two topical issues related to LIV Golf: Players seeking reinstatement to the PGA Tour and the possibility of two organizations merging.\n  ",
                        "Per a source with knowledge of the contract, the Browns have the right to convert “any portion” of Watson's compensation (salary, bonuses, etc.) into a signing bonus, in any year of the contract.\n  ",
                        "D'Angelo\n  PGA Tour Commissioner Jay Monahan speaks during a news conference before the start of the Travelers Championship golf tournament at TPC River Highlands, Wednesday, June 22, 2022, in Cromwell, Conn. (AP Photo/Seth Wenig)\n  Golf Channel's Rex Hoggard reported Monday that whispers of players who might be reconsidering have grown louder.",
                        "In June, before LIV's inaugural event in London, Monahan informed his membership any player who joined LIV was suspended from the PGA Tour."
                    ]
                },
                "title": "Los Angeles Lakers Stax",
                "words_count": 723
            },
            {
                "id": 5375461287,
                "body": "Los Angeles Lakers Stax   Continue reading  Mychal Thompson identifies Warriors' biggest potential NBA playoff weakness\n Angelina Martin\n  Klay's dad identifies Dubs' biggest potential playoff weakness originally appeared on NBC Sports Bayarea\n  As the Warriors make an NBA playoff push, Mychal Thompson believes their latest loss to the Los Angeles Lakers showcased a problem that will haunt Golden State in the weeks to come.\n  Klay Thompson 's dad -- a two-time NBA champion himself -- joined KNBR's “Murph & Mac” show, where he was asked Monday why the Warriors lost three of their four games against the Lakers this season following a 113-105 defeat Sunday at Crypto.com Arena.\n  “I've been talking about this all year long, but nobody wants to listen to me up there in the Bay,” Mychal Thompson said. “You've got to get bigger. Last night, it was old-school basketball -- the Lakers had this dominant guy [Anthony Davis] in the middle, and they used him. …\n  “ Kevon Looney being the biggest guy for the Warriors could be a problem in the playoffs. Kevon plays his heart out, but sometimes the size can just wear you out in the paint, and if you're going to beat the Warriors, you can't outshoot them, so you've just got to go inside and try to beat them up in the paint.”\n  Thompson pointed out the league's best bigs, such as Nikola Jokić and Joel Embiid , who provide an offensive spark while also serving as key defenders. The Warriors sought a power forward/center who could space the floor and make an impact in the paint at the NBA trade deadline last month, but to no avail -- leaving the 6-foot-9 JaMychal Green as backup “big” to similarly sized Looney.\n  But it has been clear for years that Warriors coach Steve Kerr is comfortable with a team that lacks traditional size, from the Death Lineup of the past to last season's NBA championship small-ball approach that torched opposing teams.\n  In Thompson's eyes, that strategy won't work this season.\n  “You can't drive your car looking in the rearview mirror,” Thompson said. “You've got to look in the windshield. This year, it looks like size is important. Yeah, they got away with it last year, but this year, it's going to be tough.\n  “The Warriors scrap and play their hearts out, but since they're so small, Steve Kerr's got to emphasize everybody's got to have a foot in the paint when the shot goes up. … Because as Pat Riley once said, ‘No rebounds, no rings.' That holds true to this day.”\n  RELATED: Steph , Klay still confident in Warriors' chances to repeat\n  It was thought that the Warriors might bring in size via the buyout market after trading away inexperienced 7-footer James Wiseman at the deadline, but it hasn't happened. And as the Western Conference's current No. 5 seed, with either the play-in tournament or a playoff berth on the horizon, only time will tell if Golden State's lack of size will hold the team back from defending its NBA title.\n  Download and follow the Dubs Talk Podcast\n  ESPN analyst JJ Redick responds to Kendrick Perkins' insinuations about Dirk Nowitzki, other MVP selections\n  Lawrence Dow\n  Kendrick Perkins caused controversy when he previously insinuated that race played a part in the reasoning that Dirk Nowitzki, Steve Nash and Nikola Jokic won their MVP awards.\n  On Tuesday, ESPN analyst and former NBA sharpshooter JJ Redick responded to Perkins' claims on “First Take” deriding them.\n  Redick called out Perkins for cherry-picking data showing that since 1990 the only MVP award winners that did not rank top 10 in scoring average were Nowitzki, Nash and Jokic.\n  Redick pointed out that if he went back only a couple of years before 1990 Perkins would've seen that Magic Johnson had also won MVP without ranking in the top ten in scoring average.\n  Redick also used advanced statistics pointing out that Nowitzki led the league in win shares and offensive win shares the year he won the MVP.\n  JJ Redick condemns First Take and pushes back on Kendrick Perkins alleging NBA MVP voters have a racial bias against Black players: pic.twitter.com/7pOMmGW4AH\n  — Awful Announcing (@awfulannouncing) March 7, 2023\n  Here's the resolution pic.twitter.com/ZZb4Du1MhH\n  — Awful Announcing (@awfulannouncing) March 7, 2023",
                "author": {
                    "avatar_url": null,
                    "id": 3040616,
                    "name": ""
                },
                "links": {
                    "canonical": null,
                    "permalink": "https://sports.yahoo.com/m/e480fd37-dd17-3f39-a1d8-bbe13c879fcb/los-angeles-lakers-stax.html",
                    "related_stories": "/related_stories?story_id=5375461287",
                    "clusters": "/stories?clusters[]=441192596"
                },
                "media": [
                    "https://s.yimg.com/am/365d/afaed4256bf3149cf1afb2d2ac2d57bc"
                ],
                "published_at": "2023-03-07 21:32:41+00:00",
                "sentiment": {
                    "body": {
                        "polarity": "positive",
                        "score": 0.99
                    },
                    "title": {
                        "polarity": "neutral",
                        "score": 0.45
                    }
                },
                "summary": {
                    "sentences": [
                        "Los Angeles Lakers Stax   Continue reading  Mychal Thompson identifies Warriors' biggest potential NBA playoff weakness\n Angelina Martin\n  Klay's dad identifies Dubs' biggest potential playoff weakness originally appeared on NBC Sports Bayarea\n  As the Warriors make an NBA playoff push, Mychal Thompson believes their latest loss to the Los Angeles Lakers showcased a problem that will haunt Golden State in the weeks to come.\n  ",
                        "But it has been clear for years that Warriors coach Steve Kerr is comfortable with a team that lacks traditional size, from the Death Lineup of the past to last season's NBA championship small-ball approach that torched opposing teams.\n  ",
                        "Klay Thompson 's dad -- a two-time NBA champion himself -- joined KNBR's “Murph & Mac” show, where he was asked Monday why the Warriors lost three of their four games against the Lakers this season following a 113-105 defeat Sunday at Crypto.com Arena.\n  ",
                        "Download and follow the Dubs Talk Podcast\n  ESPN analyst JJ Redick responds to Kendrick Perkins' insinuations about Dirk Nowitzki, other MVP selections\n  Lawrence Dow\n  Kendrick Perkins caused controversy when he previously insinuated that race played a part in the reasoning that Dirk Nowitzki, Steve Nash and Nikola Jokic won their MVP awards.\n  ",
                        "JJ Redick condemns First Take and pushes back on Kendrick Perkins alleging NBA MVP voters have a racial bias against Black players: pic.twitter.com/7pOMmGW4AH\n  — Awful Announcing (@awfulannouncing) March 7, 2023\n  "
                    ]
                },
                "title": "Los Angeles Lakers Stax",
                "words_count": 728
            }
        ]
    })

    // useDidMountEffect(() => {
    //     // getNews()
    // }, [])

    // const getNews = props => {
    //      api.get('/api/hello')
    //         .then(response => {
    //             console.log(response)
    //         })
    //         .catch(error => {
    //            console.log(error);
    //         });
    // }
    const handleResult = (response) => {
        if(response.status == 200){
            console.log(response.data)
            setData((data) => ({
                ...data,
                responseData: response.data
            }))
        }
    }

    return (
        <main className="wrap dashboard">
            <Header />
            <section className="profile page">
                <div className="profile_wrapper">
                    <div className="profile_sticky_wrapper">
                        <div className="my_profile">
                            <div className="profile_header">
                                <h1 className="page_title">Filters</h1>
                            </div>
                            <hr />
                            <Filters onResult={handleResult}/>
                        </div>
                    </div>
                </div>
                
                <div className="my_projects mvp_articles">
                    <div className="profile_sticky_wrapper">
                        <div className="profile_header">
                            <h1 className="page_title">Articles</h1>
                        </div>
                    </div>
                    <div className="articles_wrap list_wrapper big">
                        {/*<PostsListSkeleton count={5}/>*/}
                        {data.responseData.map((item) => <PostsItem data={item} key={item.id}/>)}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}