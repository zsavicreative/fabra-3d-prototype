import React from "react";
import { useSnapshot } from "valtio";
import { Leva } from "leva";
import { AnimatePresence, motion } from "framer-motion";
import { state } from "../store";
import { keyValueLists } from "../constants";

function UserInterface() {
  const snapshot = useSnapshot(state);

  return (
    <>
      <AnimatePresence>
        {!snapshot.introFinished && (
          <>
            <motion.div
              key='welcome-modal'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.5 }}
              className='absolute top-0 left-0 z-20 w-full h-full bg-black/20 pointer-events-auto flex items-center justify-center px-5'
            >
              <div className='p-5 bg-white shadow-md rounded-md overflow-hidden flex flex-col gap-5'>
                <h1 className='text-center font-bold text-4xl'>
                  Welcome to this <span className='text-[#7e5ef5]'>Fabra</span> POC
                </h1>

                <div>
                  <p className='underline font-bold text-lg'>Control tips:</p>
                  <ul className='list-disc pl-5'>
                    <li>
                      Use the controls on the top right to change the material of the selected part,
                      or the whole model.
                    </li>
                    <li>While in free camera mode, click and drag to rotate around the model.</li>
                    <li>Click the part of the model you wish to select.</li>
                    <li>Once a part is selected the camera will swing to that part.</li>
                    <li>The current selected part will be displayed on the bottom left.</li>
                    <li>To enter free camera mode again, deselect the part.</li>
                    <li>To deselect, click the ground, or press escape key.</li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    state.introFinished = true;
                  }}
                  className='bg-[#7e5ef5] text-white px-8 py-2 rounded-md text-center mx-auto'
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </>
        )}

        <motion.div
          key='leva-controls'
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ opacity: snapshot.introFinished ? 1 : 0, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 20, y: -20 }}
          transition={{ duration: 0.5 }}
          className='w-full lg:w-[400px] absolute p-5 lg:top-0 lg:right-0 pointer-events-auto z-10'
        >
          <Leva fill oneLineLabels />
        </motion.div>
        {snapshot.introFinished && (
          <>
            <motion.a
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: 20 }}
              transition={{ duration: 0.5 }}
              key='fabra-logo'
              href='https://fabra.com/'
              className='absolute bottom-0 right-0 p-5 text-white z-10'
            >
              <div className='w-40 lg:w-52'>
                <svg viewBox='0 0 1130 224' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill='#E1D9FF'
                    d='M700.742 6.22227C700.742 2.7858 703.504 0 706.911 0H818.385C818.393 0 818.399 0.0068 818.399 0.01519C818.399 0.02358 818.407 0.03038 818.415 0.03038C855.746 0.03864 886.518 30.5708 886.518 68.2327C886.518 100.263 864.26 127.136 834.64 134.462C829.147 135.821 826.493 143.445 830.719 147.238L904.121 213.13C908.356 216.932 905.692 224 900.021 224H864.643C863.132 224 861.672 223.44 860.543 222.427L766.469 137.979C765.34 136.965 763.88 136.405 762.368 136.405H717.747C714.341 136.405 711.579 139.191 711.579 142.627V218.534C711.579 221.553 709.154 224 706.161 224C703.168 224 700.742 221.553 700.742 218.534L700.742 136.405V111.603V6.22227ZM810.66 122.71C838.874 122.71 861.747 98.7676 861.747 69.233C861.747 39.6985 838.874 15.7562 810.66 15.7562C782.444 15.7562 759.572 39.6985 759.572 69.233C759.572 98.7676 782.444 122.71 810.66 122.71Z'
                  ></path>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill='#E1D9FF'
                    d='M478.401 0C471.534 0 465.967 5.57158 465.967 12.4444V18.0651V101.161V122.838V205.937V211.554C465.967 218.428 471.534 223.998 478.401 223.998H639.235C667.145 223.998 689.771 201.353 689.771 173.418C689.771 145.483 667.145 122.838 639.235 122.838H483.772C477.924 122.709 473.218 117.939 473.186 112.062C473.186 107 475.145 101.164 484.016 101.164L639.235 101.161C667.145 101.161 689.771 78.5156 689.771 50.5806C689.771 22.6458 667.145 0 639.235 0H478.401ZM473.186 41.2953C473.186 40.4362 473.883 39.7398 474.741 39.7398H664.503C670.483 39.7398 675.332 44.5923 675.332 50.5784C675.332 56.5645 670.483 61.4172 664.503 61.4172H474.741C473.883 61.4172 473.186 60.7208 473.186 59.8617V41.2953ZM474.741 162.584C473.883 162.584 473.186 163.28 473.186 164.139V182.706C473.186 183.565 473.883 184.262 474.741 184.262H664.503C670.483 184.262 675.332 179.408 675.332 173.423C675.332 167.437 670.483 162.584 664.503 162.584H474.741Z'
                  ></path>
                  <path
                    fill='#E1D9FF'
                    d='M146.146 0C146.146 0 164.362 0 181.299 0C203.671 0 223.803 12.4849 223.803 35.2139C223.803 54.7416 203.989 68.507 185.774 68.507C167.877 68.507 89.5801 68.507 87.9821 68.507C86.7038 68.507 85.7452 69.7875 85.7452 70.7479C86.0647 72.0283 86.7038 73.3088 87.9821 73.3088C89.5801 73.3088 167.877 73.3088 167.877 73.3088C203.671 73.3088 213.577 88.6749 220.288 101.48C226.999 113.965 226.04 142.136 199.516 155.261C172.991 168.386 153.176 151.42 144.867 142.776C136.558 134.133 47.3955 42.8969 46.1172 41.6164C44.8389 40.3359 43.241 41.2963 42.6019 41.6164C42.2822 41.9365 41.6431 43.8573 42.6019 44.8176C43.8802 46.0981 127.61 131.892 127.61 131.892C150.62 155.261 156.692 182.792 131.125 207.762C105.559 232.731 43.241 232.411 13.8397 181.832C-14.6029 132.852 4.25233 70.1076 39.0865 35.534C74.2403 0.96038 118.662 0 146.146 0Z'
                  ></path>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill='#E1D9FF'
                    d='M259.129 0C243.679 0 231.154 12.536 231.154 28C231.154 43.4639 243.679 56 259.129 56H307.009C318.066 56 323.622 69.3619 315.831 77.2137L245.156 148.438C236.545 156.396 231.154 167.79 231.154 180.444C231.154 204.5 250.637 224 274.671 224H436.307H442.524H454.957V211.556V205.333V149.333V136.889V28V24.9791C454.957 24.9292 454.917 24.8889 454.867 24.8889C454.822 24.8889 454.783 24.854 454.777 24.8083C453.195 10.8473 441.353 0 426.982 0H259.129ZM324.405 133.778C324.405 111.441 342.498 93.3333 364.814 93.3333C387.131 93.3333 405.223 111.441 405.223 133.778C405.223 156.114 387.131 174.222 364.814 174.222C342.498 174.222 324.405 156.114 324.405 133.778Z'
                  ></path>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill='#E1D9FF'
                    d='M906.196 18.6667C906.196 8.35735 914.547 0 924.847 0H1031.82C1032 0 1032.15 0.00142 1032.32 0.00882C1035.75 0.15334 1075.89 2.38088 1101.76 28.2693C1127.62 54.1576 1129.85 94.3284 1129.99 97.764C1130 97.9398 1130 98.088 1130 98.264V205.333C1130 215.642 1121.65 224 1111.35 224H1025.87C1015.57 224 1007.22 215.642 1007.22 205.333V116.752C1007.22 91.6677 996.601 61.3109 980.319 42.2991C965.941 25.5102 946.933 17.6772 932.949 14.033C922.747 11.3748 913.967 19.6313 913.967 30.182V101.111C913.967 111.42 922.318 119.778 932.618 119.778H982.928C994.033 119.778 1002.76 129.501 999.58 140.152C995.761 152.957 988.744 168.344 975.866 180.415C960.436 194.878 939.925 201.455 925.161 204.437C914.873 206.514 906.196 198.224 906.196 187.721V116.667V115.111V18.6667Z'
                  ></path>
                </svg>
              </div>
            </motion.a>

            <motion.div
              key='current-selection'
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{
                opacity: keyValueLists[snapshot.currentMeshType][snapshot.currentSelectedMesh]
                  ? 1
                  : 0,
                x: 0,
                y: 0,
              }}
              exit={{ opacity: 0, x: -20, y: 20 }}
              className='absolute bottom-5 left-5 text-[#fff] text-lg lg:text-3xl bg-[#7e5ef5] px-5 py-3 rounded-lg z-10'
            >
              <h2>{keyValueLists[snapshot.currentMeshType][snapshot.currentSelectedMesh]}</h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default UserInterface;
