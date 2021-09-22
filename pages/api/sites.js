import db from '@/lib/firebase-admin';

export default async function handler(_, res) {
  const sitesRef = db.collection('sites');
  const docs = await sitesRef.get();
  const sites = [];
  docs.forEach(doc => {
    sites.push({id: doc.id, ...doc.data()});
  });
  res.status(200).json({ sites })
}
