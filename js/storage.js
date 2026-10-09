import {getFirebaseApp} from './firebase-app.js';
export function participation(data){return {id:data.id,version:data.version,pre_answers:data.pre.answers,pre_score:data.pre.score,post_answers:data.post.answers,post_score:data.post.score,outcome:data.outcome,analysis_ms:data.analysisMs,events:data.events.map(e=>({name:e.name,stage:e.stage,elapsed_ms:e.elapsedMs,...(Number.isFinite(e.durationMs)?{duration_ms:e.durationMs}:{})}))};}
let userPromise;
async function client(){
 const [app,authSDK,dbSDK]=await Promise.all([getFirebaseApp(),import('https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js'),import('https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js')]);
 const auth=authSDK.getAuth(app);await auth.authStateReady();
 if(!auth.currentUser){userPromise??=authSDK.signInAnonymously(auth).finally(()=>{userPromise=null});await userPromise}
 return {uid:auth.currentUser.uid,db:dbSDK.getFirestore(app),sdk:dbSDK};
}
export async function sendParticipation(data){
 const {uid,db,sdk}=await client();const ref=sdk.doc(db,'participacoes',uid+'_'+data.id);
 await sdk.runTransaction(db,async transaction=>{const existing=await transaction.get(ref);if(existing.exists())return;transaction.set(ref,{...participation(data),uid,created_at:sdk.serverTimestamp()})});
}
