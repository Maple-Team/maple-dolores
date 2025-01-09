import { dependencies } from '../../package.json'
export const CommonFooter = () => {
  return (
    <div className="py-2 flex flex-col items-center">
      <h1>Powered By Next.js V{dependencies.next}</h1>
    </div>
  )
}
