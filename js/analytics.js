import {getFirebaseApp} from './firebase-app.js';
import {analyticsConfig} from './analytics-config.js';
// O carregamento assíncrono mantém a atividade disponível se Analytics for bloqueado.
const ready=(async()=>{
 try{
  const [appSDK,analyticsSDK]=await Promise.all([
   import('https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js'),
   import('https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js')
  ]);
  if(!await analyticsSDK.isSupported())return null;
  const app=await getFirebaseApp();
  const analytics=analyticsSDK.initializeAnalytics(app,{config:{allow_google_signals:false,allow_ad_personalization_signals:false,debug_mode:analyticsConfig.debug}});
  return {analytics,logEvent:analyticsSDK.logEvent};
 }catch(error){console.warn('Firebase Analytics indisponível. A atividade continua.',error.code||error.name);return null}
})();
export function track(name,params={}){
 void ready.then(client=>{if(client)client.logEvent(client.analytics,name,params)}).catch(()=>{});
}
export function trackActivity(event,data){
 const params={activity_stage:event.stage,elapsed_ms:event.elapsedMs};
 if(Number.isFinite(event.analysisMs))params.analysis_ms=event.analysisMs;
 if(Number.isFinite(event.valueMs))params.analysis_ms=event.valueMs;
 if(event.name==='respondeu_quiz_inicial')params.quiz_score=data.pre.score;
 if(event.name==='respondeu_quiz_final')params.quiz_score=data.post.score;
 track(event.name,params);
}
