import Image from 'next/image';
import editIcon from '../../../../public/assets/image/profile/edit-icon.png';
import editprofile from '../../../../public/assets/image/profile/edit-profile.png';
import purchaseHistoryIcon from '../../../../public/assets/image/profile/purchase-history-icon.png';

const Page = () => {

    return (
        <>
            <div className='flex justify-between items-center'>
                <h5 className='font-bold text-lg'>Purchase History</h5>
                <div className='justify-end w-16'><Image src={editprofile} alt="Edit profile image" className="mr-2" /></div>
            </div>

            <table class="min-w-full divide-y divide-gray-200 mt-8">
                <thead class="bg-[#338DFB]">
                    <tr>
                        <th class="px-6 py-3 text-left text-sm font-bold text-[#fff] tracking-wider">Your Service Name</th>
                        <th class="px-6 py-3 text-left text-sm font-bold text-[#fff] tracking-wider">Start Date</th>
                        <th class="px-6 py-3 text-left text-sm font-bold text-[#fff] tracking-wider">End Date</th>
                        <th class="px-6 py-3 text-left text-sm font-bold text-[#fff] tracking-wider">Amount</th>
                        <th class="px-6 py-3 text-left text-sm font-bold text-[#fff] tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Devloped Website</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20/10/2024</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10/12/2024</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $45
                            <button class="ml-2 bg-gray-400 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Pay Later</button>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pending</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Devloped Website</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20/10/2024</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10/12/2024</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $45
                            <button class="ml-2 bg-gray-400 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Pay Later</button>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pending</td>
                    </tr>
                </tbody>
            </table>


            {/* <table class="table-auto">
                        <thead>
                            <tr>
                                <th>Your Service Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Devloped Website</td>
                                <td>20/10/2024</td>
                                <td>10/12/2024</td>
                                <td>$45 <button>Pay Later</button></td>
                                <td>Pending</td>
                            </tr>
                            <tr>
                                <td>Devloped Website</td>
                                <td>20/10/2024</td>
                                <td>10/12/2024</td>
                                <td>$45 <button>Pay Later</button></td>
                                <td>Pending</td>
                            </tr>
                        </tbody>
                    </table> */}
        </>
    )
}

export default Page;
