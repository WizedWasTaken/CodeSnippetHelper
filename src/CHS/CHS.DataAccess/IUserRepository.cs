﻿using CHS.Entities;

namespace CHS.DataAccess
{
    public interface IUserRepository : IRepository<User>
    {
        User GetByEmail(string email);

        object GetStatistics(Statistics typeOfStat, User? user);
    }
}