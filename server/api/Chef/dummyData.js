/*
* Chef dummy data
*
* This contains defalut Chef dummy data.
*/


import Chef from './model';

export default function chefData() {
    Chef.count().exec((err, count) => {
        if (count > 0) {
            return;
        }
        Chef.find({}).remove(function () {
            Chef.create({
                item: `Chef item`,
                info: 'Lorem ipsssum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                created_by: `Chef`,
                created_at: '2008-12-17T11:01:23.460Z',
            }, (error) => {
                if (!error) {
                    console.log('ready to go!');
                }
            });
        });
    });
}